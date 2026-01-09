import React from 'react';
import { Manufacturer, Model } from '../../types';
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

interface ModelsHookResult {
  selectedModels: string[];
  modelSearchTerm: string;
  isModelOpen: boolean;
  modelDropdownRef: React.RefObject<HTMLDivElement | null>;
  modelsByManufacturer: Map<string, Model[]>;
  filteredModelsByManufacturer: Array<{ manufacturer: Manufacturer; models: Model[] }>;
  setIsModelOpen: (open: boolean) => void;
  setModelSearchTerm: (term: string) => void;
  handleModelToggle: (modelId: string) => void;
  handleSelectModels: () => void;
}

interface ModelsProps {
  modelsHook: ModelsHookResult;
}

const Models = ({ modelsHook }: ModelsProps) => {
  const {
    selectedModels,
    modelSearchTerm,
    isModelOpen,
    modelDropdownRef,
    modelsByManufacturer,
    filteredModelsByManufacturer,
    setIsModelOpen,
    setModelSearchTerm,
    handleModelToggle,
    handleSelectModels,
  } = modelsHook;

  const getAllModels = (): Model[] => {
    const allModels: Model[] = [];
    modelsByManufacturer.forEach((models) => {
      allModels.push(...models);
    });
    return allModels;
  };

  const displayValue =
    modelSearchTerm ||
    (selectedModels.length > 0
      ? selectedModels
          .map((id) => {
            const allModels = getAllModels();
            const model = allModels.find((m: Model) => String(m.model_id) === id);
            return model?.model_name || '';
          })
          .filter(Boolean)
          .join(', ')
      : '');

  return (
    <FilterGroup>
      <Label>მოდელი</Label>
      <MultiSelectContainer ref={modelDropdownRef}>
        <MultiSelectInput onClick={() => setIsModelOpen(!isModelOpen)}>
          <MultiSelectInputText
            type="text"
            placeholder="მოდელი"
            value={displayValue}
            onChange={(e) => {
              setModelSearchTerm(e.target.value);
              setIsModelOpen(true);
            }}
            onFocus={() => {
              setIsModelOpen(true);
              setModelSearchTerm('');
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsModelOpen(true);
            }}
          />
          <ChevronIcon src="/chevron.svg" alt="Dropdown" isOpen={isModelOpen} />
        </MultiSelectInput>
        <Dropdown isOpen={isModelOpen}>
          <DropdownContent>
            {filteredModelsByManufacturer.length > 0 ? (
              filteredModelsByManufacturer.map(({ manufacturer, models }) => (
                <div key={manufacturer.man_id}>
                  <div
                    style={{
                      padding: '12px 16px',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#333',
                      backgroundColor: '#f9f9f9',
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    {manufacturer.man_name}
                  </div>
                  {models.map((model) => (
                    <DropdownItem key={`${manufacturer.man_id}-${model.model_id}`}>
                      <Checkbox
                        type="checkbox"
                        checked={selectedModels.includes(String(model.model_id))}
                        onChange={() => handleModelToggle(String(model.model_id))}
                      />
                      <span>{model.model_name}</span>
                    </DropdownItem>
                  ))}
                </div>
              ))
            ) : (
              <div style={{ padding: '12px', textAlign: 'center', color: '#999' }}>
                მოდელი არ მოიძებნა
              </div>
            )}
          </DropdownContent>
          <SelectButton onClick={handleSelectModels}>არჩევა</SelectButton>
        </Dropdown>
      </MultiSelectContainer>
    </FilterGroup>
  );
};

export default Models;
