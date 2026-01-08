import React from 'react';
import { SwitcherContainer, VehicleIcon, VehicleIconImage } from './styles';

interface VehicleTypeSwitcherProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const VehicleTypeSwitcher: React.FC<VehicleTypeSwitcherProps> = ({
  selectedType,
  onTypeChange,
}) => {
  const vehicleTypes = [
    { value: 'car', label: 'მანქანა', icon: '/car.svg' },
    { value: 'tractor', label: 'ტრაქტორი', icon: '/track.svg' },
    { value: 'motorcycle', label: 'მოტოციკლი', icon: '/moto.svg' },
  ];

  return (
    <SwitcherContainer>
      {vehicleTypes.map((type) => (
        <VehicleIcon
          key={type.value}
          isActive={selectedType === type.value}
          onClick={() => onTypeChange(type.value)}
          title={type.label}
        >
          <VehicleIconImage src={type.icon} alt={type.label} />
        </VehicleIcon>
      ))}
    </SwitcherContainer>
  );
};

export default VehicleTypeSwitcher;

