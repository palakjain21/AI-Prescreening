import * as React from "react";
import {
  PlusOutlined,
  DeleteOutlined,
  HolderOutlined,
  ClockCircleOutlined,
  AppstoreOutlined,
  UserOutlined,
  KeyOutlined,
  BellOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons';

// Wrapper components to maintain API compatibility
export const Plus: React.FC<{ className?: string }> = ({ className }) => (
  <PlusOutlined className={className} />
);

export const Trash2: React.FC<{ className?: string }> = ({ className }) => (
  <DeleteOutlined className={className} />
);

export const GripVertical: React.FC<{ className?: string }> = ({ className }) => (
  <HolderOutlined className={className} />
);

export const Clock: React.FC<{ className?: string }> = ({ className }) => (
  <ClockCircleOutlined className={className} />
);

export const Grid: React.FC<{ className?: string }> = ({ className }) => (
  <AppstoreOutlined className={className} />
);

export const User: React.FC<{ className?: string }> = ({ className }) => (
  <UserOutlined className={className} />
);

export const Key: React.FC<{ className?: string }> = ({ className }) => (
  <KeyOutlined className={className} />
);

export const Bell: React.FC<{ className?: string }> = ({ className }) => (
  <BellOutlined className={className} />
);

export const ChevronDown: React.FC<{ className?: string }> = ({ className }) => (
  <DownOutlined className={className} />
);

export const ChevronUp: React.FC<{ className?: string }> = ({ className }) => (
  <UpOutlined className={className} />
);
