import { IFilterModel } from '../models/filter.model';
import { FILTER_DATA } from '../constants/filter-configuration.const';

const SPECIAL_CATEGORIES = ['spend-anywhere', 'shop-choose-redeem', 'online-exclusives'];

export function buildParams(filterValue: IFilterModel) {
  return {
    tags: handleTags(filterValue),
    categoryIds: handleCategory(filterValue)
  };
}

export function mapQueryParamsToFilterObject(filterValue: IFilterModel, queryParams) {
  filterValue = {
    ...filterValue,
    categories: filterValue.categories.map(cate =>
      cate.type === queryParams.type || !queryParams.type ?
        {
          ...cate,
          selected: true,
          children: cate.children ? cate.children.map(sub =>
            !queryParams.category || equalOrIncludes(sub.type, queryParams.category) ?
              {
                ...sub,
                selected: true
              } : sub
          ) : []
        } : cate
    ),
    tags: filterValue.tags.map(item => !queryParams.tags || equalOrIncludes(item.type, queryParams.tags) ? {
      ...item,
      selected: true
    } : item),
    cardType: filterValue.cardType.map(item => !queryParams.cardType || equalOrIncludes(item.type, queryParams.cardType) ? {
      ...item,
      selected: true
    } : item),
  };
  return filterValue;
}

function handleTags(filterValue: IFilterModel) {
  const cardTypes = filterValue.cardType.filter(card => card.selected).map(card => `cardtype-${card.type}`);
  const tags = filterValue.tags.filter(tag => tag.selected).map(tag => tag.type);
  let tagsParams = null;
  if (cardTypes.length !== FILTER_DATA.cardType.length) {
    tagsParams = cardTypes;
  } else {
    tagsParams = tags.length === FILTER_DATA.tags.length ? null : tags;
  }
  return tagsParams;
}

function handleCategory(filterValue: IFilterModel) {
  let categories = [];
  const selectedSpecialCategories = filterValue.categories.filter(item => item.selected
    && SPECIAL_CATEGORIES.includes(item.type));
  if (selectedSpecialCategories.length) {
    return selectedSpecialCategories.map(item => item.id);
  } else {
    const selectedCategory = filterValue.categories.find(item => item.selected);
    const childrenCategory = selectedCategory?.children ? selectedCategory.children : [];
    categories = childrenCategory.filter(subCategory => subCategory.selected).map(value => value.id);
    return categories.length === childrenCategory.length ? null : categories;
  }
}

function equalOrIncludes(type, values) {
  if (Array.isArray(values)) {
    return values.includes(type);
  }
  return values === type;
}


