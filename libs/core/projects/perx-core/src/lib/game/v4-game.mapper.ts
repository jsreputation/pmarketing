// just the mapper remove the various switches
import { IGame, IGameOutcome, IPinata, IScratch, ISpin, ITree, GameType as TYPE } from './game.model';
import { Outcome, Game, PinataDisplayProperties, ScratchDisplayProperties, SpinDisplayProperties, TreeDisplayProperties } from './v4-game.service';
import { oc } from 'ts-optchain';
import { patchUrl } from '../utils/patch-url.function';

export abstract class GameV4Mapper {
  public abstract v4MapToMap(game: Game): IGame;
  public abstract default(game: Game): ITree | IPinata | IScratch | ISpin;
  // see if possible ->
  protected mapCommonPropertiesHelper(game: Game): Partial<IGame> {
    const texts: { [key: string]: string } = {};
    if (game.display_properties.header) {
      texts.title = game.display_properties.header.value.title;
      texts.subTitle = game.display_properties.header.value.description;
    }
    if (game.display_properties.play_button_text) {
      texts.button = game.display_properties.play_button_text;
    }

    const results: { [key: string]: IGameOutcome } = {};
    if (game.display_properties.outcome) {
      results.outcome = outcomeToGameOutcome(game.display_properties.outcome);
    }
    if (game.display_properties.nooutcome) {
      results.noOutcome = outcomeToGameOutcome(game.display_properties.nooutcome);
    }

    let backgroundImg = oc(game).display_properties.background_image.value.image_url() ||
      oc(game).display_properties.background_image.value.file('');
    if (backgroundImg.startsWith('http')) {
      backgroundImg = patchUrl(backgroundImg);
    }

    return ({
      id: game.id,
      remainingNumberOfTries: game.number_of_tries,
      campaignId: game.campaign_id,
      backgroundImg,
      texts,
      results
    });
  }
}

function outcomeToGameOutcome(outcome: Outcome): IGameOutcome {
  const res: IGameOutcome = {
    title: outcome.title,
    subTitle: outcome.description,
    button: outcome.button_text
  };
  if (outcome.type === 'image') {
    res.image = oc(outcome).value.image_url() || oc(outcome).value.file();
  }
  return res;
}

export class ShakeV4ToV4Mapper extends GameV4Mapper {
  public v4MapToMap(game: Game): IGame {
    const type = TYPE.shakeTheTree;
    const dpts: TreeDisplayProperties = game.display_properties as TreeDisplayProperties;
    const defaultTr = this.default();
    const config: ITree = {
      ...defaultTr,
      treeImg: dpts.tree_image.value.image_url || dpts.tree_image.value.file,
      giftImg: dpts.gift_image.value.image_url || dpts.gift_image.value.file,
      nbHangedGift: oc(dpts).number_of_gifts_shown(defaultTr.nbHangedGift),
      nbGiftsToDrop: dpts.number_of_gifts_to_drop,
      nbTaps: dpts.number_of_taps || 5,
      waitingAccessoryImg: oc(dpts).waiting_image.value.image_url() || oc(dpts).waiting_image.value.file(),
      celebratingAccessoryImg: oc(dpts).celebrating_image.value.image_url() || oc(dpts).celebrating_image.value.file()
    };

    const commonProps = this.mapCommonPropertiesHelper(game);
    return {
      type,
      ...commonProps,
      config
    } as IGame;
  }

  public default(): ITree {
    return {
      nbHangedGift: 6,
      nbGiftsToDrop: 6,
      nbTaps: 5,
      treeImg: '',
      giftImg: ''
    };
  }
}

export class TapV4ToV4Mapper extends GameV4Mapper {
  public v4MapToMap(game: Game): IGame {
    const type = TYPE.pinata;
    const dpps: PinataDisplayProperties = game.display_properties as PinataDisplayProperties;
    const config: IPinata = {
      ...this.default(),
      stillImg: dpps.still_image.value.image_url || dpps.still_image.value.file,
      brokenImg: dpps.opened_image.value.image_url || dpps.opened_image.value.file,
      breakingImg: oc(dpps).cracking_image.value.image_url() || oc(dpps).cracking_image.value.file(),
      nbTaps: dpps.number_of_taps || 5
    };

    const commonProps = this.mapCommonPropertiesHelper(game);
    return {
      type,
      ...commonProps,
      config
    } as IGame;
  }

  public default(): IPinata {
    return {
      stillImg: '',
      brokenImg: '',
      nbTaps: 5
    };
  }
}

export class ScratchV4ToV4Mapper extends GameV4Mapper {
  public v4MapToMap(game: Game): IGame {
    const type = TYPE.scratch;
    const dpps: ScratchDisplayProperties = game.display_properties as ScratchDisplayProperties;
    const config = {
      ...this.default(),
      coverImg: oc(dpps).prescratch_image.value.image_url() || oc(dpps).prescratch_image.value.file(),
      underlyingSuccessImg: oc(dpps).post_success_image.value.image_url() || oc(dpps).post_success_image.value.file(),
      underlyingFailImg: oc(dpps).post_fail_image.value.image_url() || oc(dpps).post_success_image.value.file()
    };
    ['coverImg', 'underlyingSuccessImg', 'underlyingFailImg']
      .filter(attribute => config[attribute] !== undefined)
      .forEach(attribute => config[attribute] = patchUrl(config[attribute]));

    const commonProps = this.mapCommonPropertiesHelper(game);
    return {
      type,
      ...commonProps,
      config
    } as IGame;
  }

  public default(): IScratch {
    return {
      coverImg: '',
      underlyingFailImg: '',
      underlyingSuccessImg: '',
      uncoverPortionToTrigger: 60,
      nbTaps: 5
    };
  }
}

export class SpinV4ToV4Mapper extends GameV4Mapper {
  public v4MapToMap(game: Game): IGame {
    const type = TYPE.spin;
    const dpps: SpinDisplayProperties = game.display_properties as SpinDisplayProperties;
    const tempRewardSlots = [...Array(dpps.number_of_wedges).keys()].filter(item => item % 2 !== 0);
    const rewardSlots = dpps.wedges && dpps.wedges.map(slot => {
      if (slot.has_reward) {
        return slot.position;
      }
    });
    const slices = dpps.wedges && dpps.wedges.map(slot => ({
      id: slot.position,
      backgroundColor: slot.color,
      backgroundImage: slot.has_reward && oc(slot).image.value.image_url('')
    }));
    const config = {
      ...this.default(),
      numberOfWedges: dpps.number_of_wedges,
      rewardSlots: rewardSlots && rewardSlots.length > 0 ? rewardSlots : tempRewardSlots,
      slices,
      wheelImg: oc(dpps).rim_image.value.image_url(''),
      wheelPosition: oc(dpps).wheel_position('center'),
      pointerImg: oc(dpps).pointer_image.value.image_url(''),
      background: oc(dpps).background_image.value.image_url('')
    };
    ['rewardIcon', 'wheelImg', 'pointerImg', 'background']
      .filter(attribute => config[attribute] !== undefined)
      .forEach(attribute => config[attribute] = patchUrl(config[attribute]));

    const commonProps = this.mapCommonPropertiesHelper(game);
    return {
      type,
      ...commonProps,
      config
    } as IGame;
  }

  public default(): ISpin {
    return {
      numberOfWedges: 5,
      rewardSlots: [],
      slices: [{
        id: 0,
        backgroundColor: 'blue',
        backgroundImage: ''
      }],
      wheelImg: '',
      wheelPosition: '',
      pointerImg: '',
      background: ''
    };
  }
}

