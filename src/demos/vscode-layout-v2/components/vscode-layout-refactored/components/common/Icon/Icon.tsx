import React from 'react';
import { IconKey } from '../../../constants/icons';
import { ICONS } from '../../../constants';

interface IconProps {
  name: IconKey;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  className = '',
}) => {
  const IconComponent = ICONS[name];
  const sizeClasses = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return <IconComponent className={`${sizeClasses[size]} ${className}`} />;
}; 