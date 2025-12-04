import * as React from "react";
import {
  PlusOutlined,
  DeleteOutlined,
  HolderOutlined,
  ClockCircleOutlined,
  AppstoreOutlined,
  UserOutlined,
  BellOutlined,
  DownOutlined,
  UpOutlined,
  CloseOutlined,
  ApiOutlined,
  ArrowLeftOutlined,
  LeftOutlined,
  FileTextOutlined,
  CheckOutlined,
} from '@ant-design/icons';

export const Plus: React.FC<{ className?: string }> = ({ className }) => (
  <PlusOutlined className={className} />
);

export const Trash: React.FC<{ className?: string }> = ({ className }) => (
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

export const Bell: React.FC<{ className?: string }> = ({ className }) => (
  <BellOutlined className={className} />
);

export const ChevronDown: React.FC<{ className?: string }> = ({ className }) => (
  <DownOutlined className={className} />
);

export const ChevronUp: React.FC<{ className?: string }> = ({ className }) => (
  <UpOutlined className={className} />
);

export const Close: React.FC<{ className?: string }> = ({ className }) => (
  <CloseOutlined className={className} />
);

export const Api: React.FC<{ className?: string }> = ({ className }) => (
  <ApiOutlined className={className} />
);

export const ArrowLeft: React.FC<{ className?: string }> = ({ className }) => (
  <ArrowLeftOutlined className={className} />
);

export const Left: React.FC<{ className?: string }> = ({ className }) => (
  <LeftOutlined className={className} />
);


export const FileText: React.FC<{ className?: string }> = ({ className }) => (
  <FileTextOutlined className={className} />
);


import tuneSvg from '../tune.svg';
import aiIconSvg from '../aiIcon.svg';
import checkBoxSvg from '../check_box.svg';
import drawSvg from '../draw.svg';
import pipeSvg from '../pipe.svg';
import radioButtonCheckedSvg from '../radio_button_checked.svg';

export const Tune: React.FC<{ className?: string }> = ({ className }) => (
  <img src={tuneSvg} alt='settings-icon' width={15} height={15} className={className} />
);

export const AIIcon: React.FC<{ className?: string }> = ({ className }) => (
  <img src={aiIconSvg} alt='ai-icon' width={15} height={15} className={className} />
);

export const Check: React.FC<{ className?: string }> = ({ className }) => (
  <CheckOutlined className={className} />
);

export const CheckBox: React.FC<{ className?: string }> = ({ className }) => (
  <img src={checkBoxSvg} alt='check-box-icon' className={className} />
);

export const Draw: React.FC<{ className?: string }> = ({ className }) => (
  <img src={drawSvg} alt='draw-icon' className={className} />
);

export const Pipe: React.FC<{ className?: string }> = ({ className }) => (
  <img src={pipeSvg} alt='pipe-icon' className={className} />
);

export const RadioButtonChecked: React.FC<{ className?: string }> = ({ className }) => (
  <img src={radioButtonCheckedSvg} alt='radio-button-checked-icon' className={className} />
);