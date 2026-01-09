import React from 'react';
import { CategoriesResponse } from '../../types';
import {
  FilterGroup,
  Label,
  MultiSelectContainer,
  MultiSelectInput,
  MultiSelectInputText,
  ChevronIcon,
  Dropdown,
  DropdownContent,
  DropdownItem,
  Checkbox,
  SelectButton,
} from './styles';

interface CategoryHookResult {
  selectedCategories: string[];
  categorySearchTerm: string;
  isCategoryOpen: boolean;
  categoryDropdownRef: React.RefObject<HTMLDivElement | null>;
  filteredCategories: Array<{ category_id: string | number; title: string }>;
  setIsCategoryOpen: (open: boolean) => void;
  setCategorySearchTerm: (term: string) => void;
  handleCategoryToggle: (categoryId: string) => void;
  handleSelectCategories: () => void;
}

interface CategoryProps {
  categories: CategoriesResponse | null;
  categoryHook: CategoryHookResult;
}

const Category = ({ categories, categoryHook }: CategoryProps) => {
  const {
    selectedCategories,
    categorySearchTerm,
    isCategoryOpen,
    categoryDropdownRef,
    filteredCategories,
    setIsCategoryOpen,
    setCategorySearchTerm,
    handleCategoryToggle,
    handleSelectCategories,
  } = categoryHook;

  const displayValue =
    categorySearchTerm ||
    (selectedCategories.length > 0
      ? selectedCategories
          .map((id) => {
            const cat = categories?.data?.find((c) => String(c.category_id) === id);
            return cat?.title || '';
          })
          .filter(Boolean)
          .join(', ')
      : '');

  return (
    <FilterGroup>
      <Label>კატეგორია</Label>
      <MultiSelectContainer ref={categoryDropdownRef}>
        <MultiSelectInput onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
          <MultiSelectInputText
            type="text"
            placeholder="კატეგორია"
            value={displayValue}
            onChange={(e) => {
              setCategorySearchTerm(e.target.value);
              setIsCategoryOpen(true);
            }}
            onFocus={() => {
              setIsCategoryOpen(true);
              setCategorySearchTerm('');
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsCategoryOpen(true);
            }}
          />
          <ChevronIcon src="/chevron.svg" alt="Dropdown" isOpen={isCategoryOpen} />
        </MultiSelectInput>
        <Dropdown isOpen={isCategoryOpen}>
          <DropdownContent>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <DropdownItem key={cat.category_id}>
                  <Checkbox
                    type="checkbox"
                    checked={selectedCategories.includes(String(cat.category_id))}
                    onChange={() => handleCategoryToggle(String(cat.category_id))}
                  />
                  <span>{cat.title}</span>
                </DropdownItem>
              ))
            ) : (
              <div style={{ padding: '12px', textAlign: 'center', color: '#999' }}>
                კატეგორია არ მოიძებნა
              </div>
            )}
          </DropdownContent>
          <SelectButton onClick={handleSelectCategories}>არჩევა</SelectButton>
        </Dropdown>
      </MultiSelectContainer>
    </FilterGroup>
  );
};

export default Category;
