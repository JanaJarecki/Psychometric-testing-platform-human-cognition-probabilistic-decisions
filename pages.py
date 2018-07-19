from otree.api import Currency as c, currency_range
from ._builtin import Page, WaitPage
from .models import Constants


class Consent(Page):
  def is_displayed(self):
    return self.round_number == 1
  def vars_for_template(self):
    return {
    'participation_fee': self.session.config['participation_fee'],
    }
  pass

class Coverstory(Page):
  def is_displayed(self):
    return self.round_number == 1
  pass

class Coverstory_check(Page):
  def is_displayed(self):
    return self.round_number == 1
  pass

class Incentives(Page):
  def is_displayed(self):
    return self.round_number == 1
  def vars_for_template(self):
    return {
    'participation_fee': self.session.config['participation_fee'],
    'real_world_currency_per_point': self.session.config['real_world_currency_per_point'],
    'real_world_currency_per_success': self.session.config['real_world_currency_per_success']
    }
  pass


class ResultsWaitPage(WaitPage):
  def after_all_players_arrive(self):
    for p in self.subsession.get_players():
      if self.round_number > 1:
        p.successes = p.get_last_success()
        if (not self.subsession.is_new_block()) & self.subsession.is_multitrial():
            p.state = p.get_last_state()
            

class NewBlock(Page):
  def is_displayed(self):
    return (self.subsession.is_new_block() & self.subsession.is_multitrial())
  def vars_for_template(self):
    return {
    'currentblock': self.player.block,
    'currentstate': self.player.state,
    'x1': self.participant.vars['actions'][self.player.block][0][ :2],
    'p1': self.participant.vars['actions'][self.player.block][0][2:],
    'x2': self.participant.vars['actions'][self.player.block][1][ :2],
    'p2': self.participant.vars['actions'][self.player.block][1][2:],
    'budget': self.player.budget,
    'num_blocks': self.session.vars['num_blocks'],
    'successes': self.player.successes
    }
  pass

class InstructionOneshot(Page):
  def is_displayed(self):
    return self.round_number == Constants.num_multitrial
  pass

class Choices(Page):
  form_model = 'player'
  form_fields = ['choice']
  def vars_for_template(self):
    maxx = max(map(max, *self.participant.vars['actions'][self.player.block]))
    max_earnings = max(maxx * Constants.num_trials, self.player.budget + .01)
    return {
      'x1': self.participant.vars['actions'][self.player.block][0][ :2],
      'p1': self.participant.vars['actions'][self.player.block][0][2:],
      'x2': self.participant.vars['actions'][self.player.block][1][ :2],
      'p2': self.participant.vars['actions'][self.player.block][1][2:],
      'state': self.player.state,
      'budget': self.player.budget,
      'choice': self.player.choice,
      'chart_trial': [1] * self.player.trial,  
      'max_less_state': max_earnings - self.player.state,
      'max_earning': max_earnings,
      'num_blocks': self.session.vars['num_blocks'],
      'multitrial': (self.round_number - 1) < Constants.num_multitrial,
      'successes': self.player.successes
      }
  def before_next_page(self):
    self.player.get_outcome()
    self.player.update_successes()
  pass

class Results(Page):
  def is_displayed(self):
    return self.round_number <= Constants.num_multitrial
  def vars_for_template(self):
    maxx = max(map(max, *self.participant.vars['actions'][self.player.block]))
    max_earnings = max(maxx * Constants.num_trials, self.player.budget + .01)
    return {
      'state': self.player.state + self.player.outcome,
      'required': self.player.budget - self.player.state,
      'budget': self.player.budget,
      'chart_trial': [1] * (self.player.trial),
      'max_less_state': max_earnings - self.player.state,
      'max_earning': max_earnings,
      'num_blocks': self.session.vars['num_blocks'],
      'successes': self.player.successes
      }
  pass

class ChoicesUncover(Page):
  def is_displayed(self):
    return self.round_number == 5
  form_model = 'player'
  form_fields = ['choice']
  def vars_for_template(self):
    return {
      'HV': self.participant.vars['outcomes'][1],
      'HP': self.participant.vars['probabilities'][1],
      'LV': self.participant.vars['outcomes'][0],
      'LP': self.participant.vars['probabilities'][0],
      'state': sum([p.state for p in self.player.in_all_rounds()]),
      'budget': self.player.budget,
      'choice': self.player.choice,
      'chart_trial': [1] * (self.participant.vars['trial'] + 1),
      'max_less_state': int(max(self.participant.vars['outcomes'][1])) * Constants.num_rounds - sum([p.outcome for p in self.player.in_all_rounds()]),
      'max_earning': int(max(self.participant.vars['outcomes'][1])) * Constants.num_rounds
      }
  pass




page_sequence = [
  # Consent,
  # Coverstory,
  # Coverstory_check,
  # Incentives,
  ResultsWaitPage,
  NewBlock,
  Choices,
  Results,
  # InstructionOneshot,
]
