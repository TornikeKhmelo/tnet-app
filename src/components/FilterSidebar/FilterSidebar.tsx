import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api';
import { Filters, Manufacturer, Model, CategoriesResponse } from '../../types';
import VehicleTypeSwitcher from '../Switcher/VehicleTypeSwitcher';
import { SidebarContainer, FiltersContainer, FilterGroup, Label, PriceInputs, Input, SearchButton, CurrencySwitcher, CurrencyButton, PriceLabelRow, MultiSelectContainer, MultiSelectInput, MultiSelectInputText, ChevronIcon, Dropdown, DropdownContent, SelectButton, DropdownItem, Checkbox, ToggleSwitchContainer, ToggleLabel, ToggleSwitch } from './styles';



interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onSearch: () => void;
  resultCount: number;
  manufacturers: Manufacturer[];
  categories: CategoriesResponse | null;
  vehicleType: string;
  onVehicleTypeChange: (type: string) => void;
}

const FilterSidebar = ({ filters, onFilterChange, onSearch, resultCount, manufacturers, categories, vehicleType, onVehicleTypeChange }: FilterSidebarProps) => {
  const [isManufacturerOpen, setIsManufacturerOpen] = useState(false);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Model dropdown
  const [modelsByManufacturer, setModelsByManufacturer] = useState<Map<string, Model[]>>(new Map());
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [modelSearchTerm, setModelSearchTerm] = useState('');
  const modelDropdownRef = useRef<HTMLDivElement>(null);

  // Category
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const categoryDropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsManufacturerOpen(false);
      }
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(event.target as Node)) {
        setIsModelOpen(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };

    if (isManufacturerOpen || isModelOpen || isCategoryOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isManufacturerOpen, isModelOpen, isCategoryOpen]);


  useEffect(() => {
    const loadModels = async () => {
      try {
        let manufacturerIds: string[] = [];
        if (Array.isArray(filters.manufacturer) && filters.manufacturer.length > 0) {
          manufacturerIds = filters.manufacturer.map(id => String(id));
        } else if (typeof filters.manufacturer === 'string' && filters.manufacturer) {
          manufacturerIds = [filters.manufacturer];
        }

        if (manufacturerIds.length === 0) {
          setModelsByManufacturer(new Map());
          return;
        }

        const newModelsMap = new Map<string, Model[]>();
        const promises = manufacturerIds.map(async (manId) => {
          try {
            const modelsData = await api.getModels(manId);
            let models: Model[] = [];
            if (Array.isArray(modelsData)) {
              models = modelsData;
            } else if (modelsData && Array.isArray(modelsData.data)) {
              models = modelsData.data;
            }
            newModelsMap.set(manId, models);
          } catch (error) {
            console.error(`Error loading models for manufacturer ${manId}:`, error);
            newModelsMap.set(manId, []);
          }
        });

        await Promise.all(promises);
        setModelsByManufacturer(newModelsMap);
      } catch (error) {
        console.error('Error loading models in FilterSidebar:', error);
        setModelsByManufacturer(new Map());
      }
    };

    loadModels();
  }, [filters.manufacturer]);

  useEffect(() => {
    if (filters.manufacturer) {
      if (Array.isArray(filters.manufacturer)) {
        setSelectedManufacturers(filters.manufacturer);
      } else {
        setSelectedManufacturers([filters.manufacturer]);
      }
    } else {
      setSelectedManufacturers([]);
    }
  }, [filters.manufacturer]);

  useEffect(() => {
    // Initialze selected models
    if (filters.model) {
      if (Array.isArray(filters.model)) {
        setSelectedModels(filters.model);
      } else {
        setSelectedModels([filters.model]);
      }
    } else {
      setSelectedModels([]);
    }
  }, [filters.model]);

  useEffect(() => {
    // Initialize selected categories 
    if (filters.category) {
      if (Array.isArray(filters.category)) {
        setSelectedCategories(filters.category);
      } else {
        setSelectedCategories([filters.category]);
      }
    } else {
      setSelectedCategories([]);
    }
  }, [filters.category]);


  const handleChange = (field: string, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const handleManufacturerToggle = (manId: string) => {
    setSelectedManufacturers(prev => {
      if (prev.includes(manId)) {
        return prev.filter(id => id !== manId);
      } else {
        return [...prev, manId];
      }
    });
  };

  const handleSelectManufacturers = () => {
    onFilterChange({ ...filters, manufacturer: selectedManufacturers });
    setIsManufacturerOpen(false);
    setSearchTerm('');
  };

  const handleModelToggle = (modelId: string) => {
    setSelectedModels(prev => {
      if (prev.includes(modelId)) {
        return prev.filter(id => id !== modelId);
      } else {
        return [...prev, modelId];
      }
    });
  };

  const handleSelectModels = () => {
    onFilterChange({ ...filters, model: selectedModels.length > 0 ? selectedModels : '' });
    setIsModelOpen(false);
    setModelSearchTerm('');
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleSelectCategories = () => {
    onFilterChange({ ...filters, category: selectedCategories.length > 0 ? selectedCategories : '' });
    setIsCategoryOpen(false);
    setCategorySearchTerm('');
  };

  const handleToggleForRent = () => {
    const newValue = filters.forRent === '1' ? '0' : '1';
    onFilterChange({ ...filters, forRent: newValue });
  };

  const filteredManufacturers = manufacturers.filter(man =>
    man.man_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get all models from all selected manufacturers, grouped by manufacturer
  const getAllModels = (): Array<{ manufacturer: Manufacturer; models: Model[] }> => {
    const result: Array<{ manufacturer: Manufacturer; models: Model[] }> = [];
    selectedManufacturers.forEach(manId => {
      const manufacturer = manufacturers.find(m => String(m.man_id) === manId);
      const models = modelsByManufacturer.get(manId) || [];
      if (manufacturer && models.length > 0) {
        result.push({ manufacturer, models });
      }
    });
    return result;
  };

  const filteredModelsByManufacturer = getAllModels().map(({ manufacturer, models }) => ({
    manufacturer,
    models: models.filter(model =>
      model.model_name.toLowerCase().includes(modelSearchTerm.toLowerCase())
    )
  })).filter(({ models }) => models.length > 0);

  const filteredCategories = categories?.data?.filter(cat =>
    cat.title.toLowerCase().includes(categorySearchTerm.toLowerCase())
  ) || [];

  return (
    <SidebarContainer>
      <VehicleTypeSwitcher 
        selectedType={vehicleType}
        onTypeChange={onVehicleTypeChange}
      />
       <FiltersContainer>
      <FilterGroup>
        <ToggleSwitchContainer>
          <ToggleLabel 
            isActive={filters.forRent === '0' || !filters.forRent}
            onClick={handleToggleForRent}
          >
            იყიდება
          </ToggleLabel>
          <ToggleSwitch 
            isActive={filters.forRent === '0' || !filters.forRent}
            onClick={handleToggleForRent}
          />
          <ToggleLabel 
            isActive={filters.forRent === '1'}
            onClick={handleToggleForRent}
          >
            ქირავდება
          </ToggleLabel>
        </ToggleSwitchContainer>
      </FilterGroup>

      <FilterGroup>
        <Label>მწარმოებელი</Label>
        <MultiSelectContainer ref={dropdownRef}>
          <MultiSelectInput onClick={() => setIsManufacturerOpen(!isManufacturerOpen)}>
            <MultiSelectInputText
              type="text"
              placeholder="მწარმოებელი"
              value={searchTerm || (selectedManufacturers.length > 0 
                ? selectedManufacturers.map(id => {
                    const man = manufacturers.find(m => String(m.man_id) === id);
                    return man?.man_name || '';
                  }).filter(Boolean).join(', ')
                : '')}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsManufacturerOpen(true);
              }}
              onFocus={() => {
                setIsManufacturerOpen(true);
                setSearchTerm('');
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsManufacturerOpen(true);
              }}
            />
            <ChevronIcon src="/chevron.svg" alt="Dropdown" isOpen={isManufacturerOpen} />
          </MultiSelectInput>
          <Dropdown isOpen={isManufacturerOpen}>
            <DropdownContent>
              {filteredManufacturers.length > 0 ? (
                filteredManufacturers.map((man) => (
                  <DropdownItem key={man.man_id}>
                    <Checkbox
                      type="checkbox"
                      checked={selectedManufacturers.includes(String(man.man_id))}
                      onChange={() => handleManufacturerToggle(String(man.man_id))}
                    />
                    <span>{man.man_name}</span>
                  </DropdownItem>
                ))
              ) : (
                <div style={{ padding: '12px', textAlign: 'center', color: '#999' }}>
                  მწარმოებელი არ მოიძებნა
                </div>
              )}
            </DropdownContent>
            <SelectButton onClick={handleSelectManufacturers}>
              არჩევა
            </SelectButton>
          </Dropdown>
        </MultiSelectContainer>
      </FilterGroup>

      {selectedManufacturers.length > 0 && (
        <FilterGroup>
          <Label>მოდელი</Label>
          <MultiSelectContainer ref={modelDropdownRef}>
            <MultiSelectInput onClick={() => setIsModelOpen(!isModelOpen)}>
              <MultiSelectInputText
                type="text"
                placeholder="მოდელი"
                value={modelSearchTerm || (selectedModels.length > 0 
                  ? selectedModels.map(id => {
                      // Find model across all manufacturers
                      const allModels: Model[] = [];
                      modelsByManufacturer.forEach((models) => {
                        allModels.push(...models);
                      });
                      const model = allModels.find((m: Model) => String(m.model_id) === id);
                      return model?.model_name || '';
                    }).filter(Boolean).join(', ')
                  : '')}
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
                      <div style={{ 
                        padding: '12px 16px', 
                        fontWeight: 600, 
                        fontSize: '14px', 
                        color: '#333',
                        backgroundColor: '#f9f9f9',
                        borderBottom: '1px solid #eee'
                      }}>
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
              <SelectButton onClick={handleSelectModels}>
                არჩევა
              </SelectButton>
            </Dropdown>
          </MultiSelectContainer>
        </FilterGroup>
      )}

      <FilterGroup>
        <Label>კატეგორია</Label>
        <MultiSelectContainer ref={categoryDropdownRef}>
          <MultiSelectInput onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
            <MultiSelectInputText
              type="text"
              placeholder="კატეგორია"
              value={categorySearchTerm || (selectedCategories.length > 0 
                ? selectedCategories.map(id => {
                    const cat = categories?.data?.find(c => String(c.category_id) === id);
                    return cat?.title || '';
                  }).filter(Boolean).join(', ')
                : '')}
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
            <SelectButton onClick={handleSelectCategories}>
              არჩევა
            </SelectButton>
          </Dropdown>
        </MultiSelectContainer>
      </FilterGroup>

      <FilterGroup>
        <PriceLabelRow>
          <Label>ფასი</Label>
          <CurrencySwitcher>
            <CurrencyButton
              isActive={filters.currency === 'GEL' || !filters.currency}
              onClick={() => handleChange('currency', 'GEL')}
              title="ლარი"
            >
              ₾
            </CurrencyButton>
            <CurrencyButton
              isActive={filters.currency === 'USD'}
              onClick={() => handleChange('currency', 'USD')}
              title="დოლარი"
            >
              $
            </CurrencyButton>
          </CurrencySwitcher>
        </PriceLabelRow>
        <PriceInputs>
          <Input
            type="number"
            placeholder="დან"
            value={filters.priceFrom || ''}
            onChange={(e) => handleChange('priceFrom', e.target.value)}
          />
          <span>-</span>
          <Input
            type="number"
            placeholder="მდე"
            value={filters.priceTo || ''}
            onChange={(e) => handleChange('priceTo', e.target.value)}
          />
        </PriceInputs>
      </FilterGroup>

      <SearchButton onClick={onSearch}>
        ძებნა {resultCount ? `(${resultCount.toLocaleString('ka-GE')})` : ''}
      </SearchButton>
    </FiltersContainer>
    </SidebarContainer>
  );
};

export default FilterSidebar;

