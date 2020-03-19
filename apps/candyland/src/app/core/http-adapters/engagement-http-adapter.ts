import { ImageControlValue } from '@cl-helpers/image-control-value';
import { ControlsName } from 'src/app/models/controls-name';
import {
  IWEngagementAttributes,
  IWInstantOutcomeEngagementAttributes,
  IWPinataGameEngagementAttributes,
  IWScratchGameEngagementAttributes,
  IWStampEngagementAttributes,
  IWSurveyEngagementAttributes,
  IWTreeGameEngagementAttributes,
  IWSpinGameEngagementAttributes,
  IWSnakeGameEngagementAttributes,
  IWSnakeDisplayProperties,
  WGameType,
  IJsonApiItem,
  IJsonApiPostData
} from '@perxtech/whistler';
import {
  IEngagementInstantReward,
  IEngagementScratchType,
  IEngagementShakeType,
  IEngagementStamps,
  IEngagementSurvey,
  IEngagementSpinType,
  IEngagementTapType,
  IEngagementType, IEngagementSnakeType
} from '@cl-core/models/engagement/engagement.interface';
import { IPinataForm } from '@cl-core/models/games/pinata/pinate-form.interface';
import { ISnakeForm } from '@cl-core/models/games/snake/snake-form';
import { IEngagementForm } from '@cl-core/models/engagement/engagement-form.interface';
import { IRewardForm } from '@cl-core/models/games/reward/reward-form-interface';
import { ISpinEntityForm } from '@cl-core/models/games/spin/spin-form.interface';
import { IShakeTreeForm } from '@cl-core/models/games/shake-tree/shake-tree-form.interface';
import { IScratchForm } from '@cl-core/models/games/scratch/scratch-form.interface';
import { IStampsEntityForm } from '@cl-core/models/games/stamps/stamps-entity-form.interface';
import { IShakeTree } from '@cl-core/models/games/shake-tree/shakeTree.interface';
import { IGraphic } from '@cl-core/models/graphic.interface';

export class EngagementHttpAdapter {
  // tslint:disable
  public static transformEngagement(
    data: IJsonApiItem<IWEngagementAttributes>
  ): IEngagementForm {
    return {
      id: data.id,
      current_type: data.type,
      urn: data.attributes.urn,
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at,
      title: data.attributes.title,
      game_type: data.attributes.game_type,
      description: data.attributes.description,
      image_url: data.attributes.image_url,
      attributes_type: data.attributes.type,
      fontName: data.attributes.display_properties.fontName,
      fontColor: data.attributes.display_properties.fontColor,
      headerColor: data.attributes.display_properties.headerColor,
      headerTitle: data.attributes.display_properties.headerTitle,
      headlineText: data.attributes.display_properties.headlineText,
      mainShapeType: data.attributes.display_properties.mainShapeType,
      backgroundColor: data.attributes.display_properties.backgroundColor,
      headerLogoImage: data.attributes.display_properties.headerLogoImage,
      subHeadlineText: data.attributes.display_properties.subHeadlineText,
      callToActionText: data.attributes.display_properties.callToActionText,
      loadingHeadlineText:
        data.attributes.display_properties.loadingHeadlineText,
      loadingSubHeadlineText:
        data.attributes.display_properties.loadingSubHeadlineText,
      background: data.attributes.display_properties.background,
      cardBackground: data.attributes.display_properties.cardBackground,
      buttonText: data.attributes.display_properties.buttonText,
      nb_of_slots: data.attributes.display_properties.nb_of_slots,
      slots: data.attributes.display_properties.slots
    };
  }

  public static transformEngagementHandler(
    data: IJsonApiItem<IWEngagementAttributes>,
    type?: string
  ): IEngagementType | undefined {
    const engagementType = type ? type : data.attributes.type;

    switch (engagementType) {
      case 'game':
        return EngagementHttpAdapter.transformGameHandler(data, engagementType);
      case 'survey':
        return EngagementHttpAdapter.transformToSurveyType(
          data,
          engagementType
        );
      case 'stamps':
        return EngagementHttpAdapter.transformToStampType(data, engagementType);
      case 'instant_reward':
        return EngagementHttpAdapter.transformToInstantReward(
          data,
          engagementType
        );
    }
  }

  public static transformToInstantReward(
    data: IJsonApiItem<IWInstantOutcomeEngagementAttributes>,
    engagementType?: string
  ): IEngagementInstantReward {
    return {
      id: data.id,
      type: data.type,
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at,
      title: data.attributes.title,
      description: data.attributes.description,
      image_url: data.attributes.image_url,
      title_display: data.attributes.display_properties.title,
      button: data.attributes.display_properties.button,
      sub_title: data.attributes.display_properties.sub_title,
      banner: data.attributes.display_properties.banner,
      attributes_type: engagementType,
      background_img_url: data.attributes.display_properties.background_img_url,
      card_background_img_url:
        data.attributes.display_properties.card_background_img_url
    };
  }

  public static transformToSurveyType(
    data: IJsonApiItem<IWSurveyEngagementAttributes>,
    engagementType?: string
  ): IEngagementSurvey {
    return {
      id: data.id,
      type: data.type,
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at,
      title: data.attributes.title,
      description: data.attributes.description,
      image_url: data.attributes.image_url,
      title_display: data.attributes.display_properties.title,
      button: data.attributes.display_properties.button,
      sub_title: data.attributes.display_properties.sub_title,
      background_img_url: data.attributes.display_properties.background_img_url,
      attributes_type: engagementType,
      progress_bar_color: data.attributes.display_properties.progress_bar_color,
      card_background_img_url:
        data.attributes.display_properties.card_background_img_url,
      questions: EngagementHttpAdapter.prepareQuestion(
        data.attributes.display_properties.questions
      )
    };
  }

  public static prepareQuestion(data: any): any {
    return data[0];
  }

  public static transformToStampType(
    data: IJsonApiItem<IWStampEngagementAttributes>,
    engagementType?: string
  ): IEngagementStamps {
    return {
      id: data.id,
      type: data.type,
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at,
      title: data.attributes.title,
      description: data.attributes.description,
      image_url: data.attributes.image_url,
      title_display: data.attributes.display_properties.title,
      button: data.attributes.display_properties.button,
      sub_title: data.attributes.display_properties.sub_title,
      slots: data.attributes.display_properties.slots,
      nb_of_slots: data.attributes.display_properties.nb_of_slots,
      pre_stamp_img_url: data.attributes.display_properties.pre_stamp_img_url,
      post_stamp_img_url: data.attributes.display_properties.post_stamp_img_url,
      reward_pre_stamp_img_url:
        data.attributes.display_properties.reward_pre_stamp_img_url,
      reward_post_stamp_img_url:
        data.attributes.display_properties.reward_post_stamp_img_url,
      attributes_type: engagementType,
      background_img_url: data.attributes.display_properties.background_img_url,
      card_background_img_url:
        data.attributes.display_properties.card_background_img_url
    };
  }

  public static transformGameHandler(
    data: IJsonApiItem<IWEngagementAttributes>,
    engagementType?: string
  ):
    | IEngagementShakeType
    | IEngagementTapType
    | IEngagementScratchType
    | IEngagementSpinType
    | IEngagementSnakeType
    | undefined {
    switch (data.attributes.game_type) {
      case WGameType.shakeTheTree:
        return EngagementHttpAdapter.transformToShackType(
          data as IJsonApiItem<IWTreeGameEngagementAttributes>,
          engagementType
        );
      case WGameType.pinata:
        return EngagementHttpAdapter.transformToPinataType(
          data as IJsonApiItem<IWPinataGameEngagementAttributes>,
          engagementType
        );
      case WGameType.scratch:
        return EngagementHttpAdapter.transformToScratchType(
          data as IJsonApiItem<IWScratchGameEngagementAttributes>,
          engagementType
        );
      case WGameType.spin:
        return EngagementHttpAdapter.transformToSpinType(
          data as IJsonApiItem<IWSpinGameEngagementAttributes>,
          engagementType
        );
      case WGameType.snake:
        return EngagementHttpAdapter.transformToSnakeType(
          data as IJsonApiItem<IWSnakeGameEngagementAttributes>,
          engagementType
        );
    }
  }

  public static transformToSnakeType(
    data: IJsonApiItem<IWSnakeGameEngagementAttributes>,
    engagementType?: string
  ) {
    return {
      id: data.id,
      type: data.type,
      game_type: data.attributes.game_type,
      title: data.attributes.title,
      description: data.attributes.description,
      image_url: data.attributes.image_url,
      title_display: data.attributes.display_properties.title,
      button: data.attributes.display_properties.button,
      sub_title: data.attributes.display_properties.sub_title,
      attributes_type: engagementType,
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at,
      target_icon_img_url: data.attributes.display_properties.target_icon_img_url,
      target_required: data.attributes.display_properties.target_required,
      snake_head_img_url: data.attributes.display_properties.snake_head_img_url,
      snake_body_img_url: data.attributes.display_properties.snake_body_img_url,
      game_area_img_url: data.attributes.display_properties.game_area_img_url,
      background_img_url: data.attributes.display_properties.background_img_url
    };
  }

  public static transformToSpinType(
    data: IJsonApiItem<IWSpinGameEngagementAttributes>,
    engagementType?: string
  ) {
    return {
      id: data.id,
      type: data.type,
      game_type: data.attributes.game_type,
      title: data.attributes.title,
      description: data.attributes.description,
      image_url: data.attributes.image_url,
      title_display: data.attributes.display_properties.title,
      button: data.attributes.display_properties.button,
      sub_title: data.attributes.display_properties.sub_title,
      attributes_type: engagementType,
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at,
      nb_of_wedges: data.attributes.display_properties.nb_of_wedges,
      slots: data.attributes.display_properties.slots.sort((a, b) => a - b),
      wedge_colors: data.attributes.display_properties.wedge_colors,
      reward_icon: data.attributes.display_properties.reward_icon,
      wheel_img: data.attributes.display_properties.wheel_img,
      wheel_position: data.attributes.display_properties.wheel_position,
      pointer_img: data.attributes.display_properties.pointer_img,
      background_img_url: data.attributes.display_properties.background_img_url
    };
  }

  public static transformToScratchType(
    data: IJsonApiItem<IWScratchGameEngagementAttributes>,
    engagementType?: string
  ) {
    return {
      id: data.id,
      type: data.type,
      game_type: data.attributes.game_type,
      title: data.attributes.title,
      description: data.attributes.description,
      image_url: data.attributes.image_url,
      title_display: data.attributes.display_properties.title,
      button: data.attributes.display_properties.button,
      sub_title: data.attributes.display_properties.sub_title,
      pre_scratch_img_url:
        data.attributes.display_properties.pre_scratch_img_url,
      post_scratch_success_img_url:
        data.attributes.display_properties.post_scratch_success_img_url,
      post_scratch_fail_img_url:
        data.attributes.display_properties.post_scratch_fail_img_url,
      attributes_type: engagementType,
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at
    };
  }

  public static transformToShackType(
    data: IJsonApiItem<IWTreeGameEngagementAttributes>,
    engagementType?: string
  ): IEngagementShakeType {
    return {
      id: data.id,
      type: data.type,
      game_type: data.attributes.game_type,
      title: data.attributes.title,
      description: data.attributes.description,
      image_url: data.attributes.image_url,
      title_display: data.attributes.display_properties.title,
      button: data.attributes.display_properties.button,
      sub_title: data.attributes.display_properties.sub_title,
      tree_img_url: data.attributes.display_properties.tree_img_url,
      nb_hanged_gifts: data.attributes.display_properties.nb_hanged_gifts,
      gift_box_img_url: data.attributes.display_properties.gift_box_img_url,
      background_img_url: data.attributes.display_properties.background_img_url,
      attributes_type: engagementType,
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at
    };
  }

  public static transformToPinataType(
    data: IJsonApiItem<IWPinataGameEngagementAttributes>,
    engagementType?: string
  ): IEngagementTapType {
    return {
      id: data.id,
      type: data.type,
      game_type: data.attributes.game_type,
      title: data.attributes.title,
      description: data.attributes.description,
      image_url: data.attributes.image_url,
      title_display: data.attributes.display_properties.title,
      button: data.attributes.display_properties.button,
      sub_title: data.attributes.display_properties.sub_title,
      attributes_type: engagementType,
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at,
      background_img_url: data.attributes.display_properties.background_img_url,
      closed_pinata_img_url:
        data.attributes.display_properties.closed_pinata_img_url,
      opened_pinata_img_url:
        data.attributes.display_properties.opened_pinata_img_url,
      cracking_pinata_img_url:
        data.attributes.display_properties.cracking_pinata_img_url
    };
  }

  public static transformFromInstantRewardForm(
    data: IRewardForm
  ): IJsonApiPostData<IWInstantOutcomeEngagementAttributes> {
    return {
      type: 'engagements',
      attributes: {
        type: 'instant_reward',
        title: data.name,
        image_url: data.image_url,
        display_properties: {
          banner: data.banner,
          title: data.headlineMessage,
          sub_title: data.headlineMessage,
          card_background_img_url: ImageControlValue.getImagePath(
            data.cardBackground
          ),
          background_img_url: ImageControlValue.getImagePath(data.background),
          button: data.buttonText
        }
      }
    };
  }

  public static transformFromSpinForm(
    data: ISpinEntityForm
  ): IJsonApiPostData<IWSpinGameEngagementAttributes> {
    return {
      type: 'engagements',
      attributes: {
        type: 'game',
        title: data.name,
        description: 'Spin and win',
        game_type: WGameType.spin,
        image_url: data.image_url,
        display_properties: {
          title: data.headlineMessage,
          button: data.buttonText,
          sub_title: data.subHeadlineMessage,
          nb_of_wedges: +data.numberOfWedges,
          slots: data.rewardSlots.sort((a, b) => a - b),
          wedge_colors: Object.values(data.colorCtrls),
          reward_icon: ImageControlValue.getImagePath(data.rewardIcon),
          wheel_img: ImageControlValue.getImagePath(data.wheelImg),
          wheel_position: ImageControlValue.getImagePath(data.wheelPosition),
          background_img_url: ImageControlValue.getImagePath(data.background),
          pointer_img: ImageControlValue.getImagePath(data.pointerImg)
        }
      }
    };
  }

  public static transformFromSnakeForm(
    data: ISnakeForm
  ): IJsonApiPostData<IWSnakeGameEngagementAttributes> {
    return {
      type: 'engagements',
      attributes: {
        type: 'game',
        title: data.name,
        description: 'Snake Game',
        game_type: WGameType.snake,
        image_url: data.image_url,
        display_properties: {
          title: data.headlineMessage,
          button: data.buttonText,
          sub_title: data.subHeadlineMessage,
          target_icon_img_url: ImageControlValue.getImagePath(data.targetIcon),
          target_required: +data.targetRequired,
          background_img_url: ImageControlValue.getImagePath(data.background),
          snake_head_img_url: ImageControlValue.getImagePath(data.snakeType),
          snake_body_img_url: ImageControlValue.getImagePath((data.snakeType as IGraphic).imageParts ? (data.snakeType as IGraphic).imageParts[0] : ''),
          game_area_img_url: ImageControlValue.getImagePath(data.gameArea)
        }
      }
    };
  }

  public static transformFromShakeTheTreeForm(
    data: IShakeTreeForm
  ): IJsonApiPostData<IWTreeGameEngagementAttributes> {
    return {
      type: 'engagements',
      attributes: {
        type: 'game',
        title: data.name,
        description: 'Spin and win',
        game_type: WGameType.shakeTheTree,
        image_url: data.image_url,
        display_properties: {
          title: data.headlineMessage,
          button: data.buttonText,
          sub_title: data.subHeadlineMessage,
          tree_img_url: ImageControlValue.getImagePath(data.treeType),
          gift_box_img_url: ImageControlValue.getImagePath(data.giftBox),
          background_img_url: ImageControlValue.getImagePath(data.background),
          nb_hanged_gifts: +data.gameGift
        }
      }
    };
  }

  public static transformFromPinataForm(
    data: IPinataForm
  ): IJsonApiPostData<IWPinataGameEngagementAttributes> {
    return {
      type: 'engagements',
      attributes: {
        type: 'game',
        title: data.name,
        game_type: WGameType.pinata,
        image_url: data.image_url,
        display_properties: {
          title: data.headlineMessage,
          button: data.buttonText,
          sub_title: data.subHeadlineMessage,
          cracking_pinata_img_url: data.crackingPinata ? ImageControlValue.getImagePath(data.crackingPinata) : undefined,
          opened_pinata_img_url: data.openedPinata ? ImageControlValue.getImagePath(data.openedPinata) : ImageControlValue.getImagePath(data.pinata),
          closed_pinata_img_url: ImageControlValue.getImagePath(data.pinata),
          background_img_url: ImageControlValue.getImagePath(data.background)
        }
      }
    };
  }

  public static transformFromScratchForm(
    data: IScratchForm
  ): IJsonApiPostData<IWScratchGameEngagementAttributes> {
    return {
      type: 'engagements',
      attributes: {
        type: 'game',
        title: data.name,
        game_type: WGameType.scratch,
        image_url: data.image_url,
        display_properties: {
          title: data.headlineMessage,
          sub_title: data.subHeadlineMessage,
          button: data.buttonText,
          pre_scratch_img_url: ImageControlValue.getImagePath(
            data.preScratchImage
          ),
          post_scratch_success_img_url: ImageControlValue.getImagePath(
            data.postScratchSuccessImage
          ),
          post_scratch_fail_img_url: ImageControlValue.getImagePath(
            data.postScratchFailImage
          ),
          background_img_url: ImageControlValue.getImagePath(data.background)
        }
      }
    };
  }

  public static transformStamp(
    data: IStampsEntityForm
  ): IJsonApiPostData<IWStampEngagementAttributes> {
    return {
      type: 'engagements',
      attributes: {
        type: 'stamps',
        title: data.name,
        image_url: data.image_url,
        display_properties: {
          nb_of_slots: data.stampsNumber,
          slots: data.stampsSlotNumber,
          pre_stamp_img_url: ImageControlValue.getImagePath(data.preStamp),
          reward_pre_stamp_img_url: ImageControlValue.getImagePath(
            data.rewardPreStamps
          ),
          post_stamp_img_url: ImageControlValue.getImagePath(data.postStamps),
          reward_post_stamp_img_url: ImageControlValue.getImagePath(
            data.rewardPostStamps
          ),
          title: data.headlineMessage,
          button: data.buttonText,
          sub_title: data.subHeadlineMessage,
          background_img_url: ImageControlValue.getImagePath(data.background),
          card_background_img_url: ImageControlValue.getImagePath(
            data.cardBackground
          )
        }
      }
    };
  }

  public static transformStampForm(
    data: IJsonApiItem<IWStampEngagementAttributes>
  ): Partial<IStampsEntityForm> {
    return {
      name: data.attributes.title,
      headlineMessage: data.attributes.display_properties.title,
      subHeadlineMessage: data.attributes.display_properties.sub_title,
      cardBackground: data.attributes.display_properties.card_background_img_url,
      background: data.attributes.display_properties.background_img_url,
      buttonText: data.attributes.display_properties.button,
      stampsNumber: data.attributes.display_properties.nb_of_slots,
      stampsSlotNumber: data.attributes.display_properties.slots,
      preStamp: data.attributes.display_properties.pre_stamp_img_url,
      rewardPreStamps: data.attributes.display_properties.reward_pre_stamp_img_url,
      postStamps: data.attributes.display_properties.post_stamp_img_url,
      rewardPostStamps: data.attributes.display_properties.reward_post_stamp_img_url
    };
  }

  public static transformSpinForm(
    data: IJsonApiItem<IWSpinGameEngagementAttributes>
  ): Partial<ISpinEntityForm> {
    return {
      name: data.attributes.title,
      headlineMessage: data.attributes.display_properties.title,
      subHeadlineMessage: data.attributes.display_properties.sub_title,
      gameType: data.attributes.game_type,
      background: data.attributes.display_properties.background_img_url,
      buttonText: data.attributes.display_properties.button,
      numberOfWedges: data.attributes.display_properties.nb_of_wedges,
      rewardSlots: data.attributes.display_properties.slots.sort((a, b) => a - b),
      colorCtrls: Object.assign(data.attributes.display_properties.wedge_colors),
      rewardIcon: data.attributes.display_properties.reward_icon,
      wheelImg: data.attributes.display_properties.wheel_img,
      wheelPosition: data.attributes.display_properties.wheel_position,
      pointerImg: data.attributes.display_properties.pointer_img
    };
  }

  public static transformSnakeForm(
    data: IJsonApiItem<IWSnakeGameEngagementAttributes>
  ): ISnakeForm {
    return {
      name: data.attributes.title,
      image_url: data.attributes.image_url,
      headlineMessage: data.attributes.display_properties.title,
      subHeadlineMessage: data.attributes.display_properties.sub_title,
      gameType: data.attributes.game_type,
      background: data.attributes.display_properties.background_img_url,
      buttonText: data.attributes.display_properties.button,
      targetRequired: data.attributes.display_properties.target_required,
      snakeType: data.attributes.display_properties.snake_body_img_url ?
        this.combineSnakeHeadAndBody(data.attributes.display_properties as Required<IWSnakeDisplayProperties>) : data.attributes.display_properties.snake_head_img_url,
      targetIcon: data.attributes.display_properties.target_icon_img_url,
      gameArea: data.attributes.display_properties.game_area_img_url
    };
  }
  // precondition was head is set, so when confirm body set we enter this function assured body and head exists
  public static combineSnakeHeadAndBody(IWSnakeDP: Required<IWSnakeDisplayProperties>): IGraphic {
    // id is 0 to highlight it is an uploaded item different from the configured ones already there
    return ({
      id: 0,
      type: 'snakeHead',
      active: false,
      img: IWSnakeDP.snake_head_img_url,
      imageParts: [
        {
          id: 0, // id doesn't matter at this point, look at confirm() of multi-upload-dialog
          type: 'snakeBody',
          active: false,
          img: IWSnakeDP.snake_body_img_url
        }
      ]
    })
  }

  public static transformRewardForm(
    data: IJsonApiItem<IWInstantOutcomeEngagementAttributes>
  ): IRewardForm {
    return {
      name: data.attributes.title,
      headlineMessage: data.attributes.display_properties.title,
      subHeadlineMessage: data.attributes.display_properties.sub_title,
      banner: data.attributes.display_properties.banner,
      buttonText: data.attributes.display_properties.button,
      [ControlsName.background]:
        data.attributes.display_properties.background_img_url,
      [ControlsName.cardBackground]:
        data.attributes.display_properties.card_background_img_url,
      image_url: data.attributes.image_url
    };
  }

  public static transformShakeTreeForm(
    data: IJsonApiItem<IWTreeGameEngagementAttributes>
  ): IShakeTree {
    return {
      name: data.attributes.title,
      gameType: data.attributes.game_type,
      headlineMessage: data.attributes.display_properties.title,
      subHeadlineMessage: data.attributes.display_properties.sub_title,
      buttonText: data.attributes.display_properties.button,
      background: data.attributes.display_properties.background_img_url,
      gameGift: data.attributes.display_properties.nb_hanged_gifts,
      giftBox: data.attributes.display_properties.gift_box_img_url,
      treeType: data.attributes.display_properties.tree_img_url
    };
  }

  public static transformPinataForm(
    data: IJsonApiItem<IWPinataGameEngagementAttributes>
  ): IPinataForm {
    return {
      id: data.id,
      type: data.type,
      gameType: data.attributes.game_type,
      name: data.attributes.title,
      headlineMessage: data.attributes.display_properties.title,
      subHeadlineMessage: data.attributes.display_properties.sub_title,
      buttonText: data.attributes.display_properties.button,
      background: data.attributes.display_properties.background_img_url,
      pinata: data.attributes.display_properties.closed_pinata_img_url,
      image_url: data.attributes.image_url
      // opened_pinata_img_url: data.attributes.display_properties.opened_pinata_img_url,
      // cracking_pinata_img_url: data.attributes.display_properties.cracking_pinata_img_url
    };
  }

  public static transformScratchForm(
    data: IJsonApiItem<IWScratchGameEngagementAttributes>
  ): IScratchForm {
    return {
      id: data.id,
      type: data.type,
      gameType: data.attributes.game_type,
      name: data.attributes.title,
      headlineMessage: data.attributes.display_properties.title,
      subHeadlineMessage: data.attributes.display_properties.sub_title,
      buttonText: data.attributes.display_properties.button,
      background: data.attributes.display_properties.background_img_url,
      preScratchImage: data.attributes.display_properties.pre_scratch_img_url,
      postScratchSuccessImage:
        data.attributes.display_properties.post_scratch_success_img_url,
      postScratchFailImage:
        data.attributes.display_properties.post_scratch_fail_img_url,
      image_url: data.attributes.image_url
    };
  }
}
