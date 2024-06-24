import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Checkbox,
  Select,
  useDisclosure,
  SelectItem,
  Textarea,
  Avatar,
  Switch,
  Image,
} from '@nextui-org/react';
import PromotionModel, {
  PromotionApplyType,
  PromotionStatus,
  promotionStatuses,
  promotionApplyTypes,
} from '@/types/models/PromotionModel';

interface CreatePromotionModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
}

export default function CreatePromotionModal({
  isOpen,
  onOpen,
  onOpenChange,
  onClose,
}: CreatePromotionModalProps) {
  const [promotion, setPromotion] = useState<PromotionModel>({
    id: 0,
    title: '',
    description: '',
    bannerUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5UW3VOtxCrPlSPnHEWVi_OndZbv7IzamS6g&s',
    amountRate: 0,
    minimumOrderValue: 0,
    maximumApplyValue: 0,
    amountValue: 0,
    applyType: PromotionApplyType.RateApply,
    status: PromotionStatus.Active,
    startDate: '',
    endDate: '',
    usageLimit: 0,
    numberOfUsed: 0,
    promotionType: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPromotion((prevPromotion) => ({
      ...prevPromotion,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Promotion details:', promotion);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent style={{ width: '1000px' }}>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Tạo mới chương trình khuyến mãi
            </ModalHeader>
            <ModalBody>
              <div className="flex gap-1">
                <div className="flex flex-col gap-1">
                  <Input
                    name="title"
                    label="Tiêu đề"
                    placeholder="Nhập tiêu đề chương trình khuyến mãi"
                    value={promotion.title}
                    onChange={handleChange}
                    fullWidth
                  />
                  <Textarea
                    name="description"
                    label="Mô tả"
                    placeholder="Nhập mô tả chương trình khuyến mãi"
                    value={promotion.description}
                    onChange={handleChange}
                    fullWidth
                  />
                  <Image width={'100%'} radius="md" src={promotion.bannerUrl} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    <Input
                      name="startDate"
                      label="Ngày bắt đầu"
                      type="date"
                      value={promotion.startDate}
                      onChange={handleChange}
                      fullWidth
                    />
                    <Input
                      name="endDate"
                      label="Ngày kết thúc"
                      type="date"
                      value={promotion.endDate}
                      onChange={handleChange}
                      fullWidth
                    />
                  </div>

                  <Select
                    name="applyType"
                    label="Loại áp dụng"
                    selectedKeys={new Set([promotion.applyType.toString()])}
                    onChange={handleChange}
                    fullWidth
                  >
                    {promotionApplyTypes.map((type) => (
                      <SelectItem key={type.key} value={type.key}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </Select>
                  {promotion.applyType == PromotionApplyType.RateApply ? (
                    <Input
                      name="amountRate"
                      label="Tỷ lệ giảm giá (%)"
                      placeholder="Nhập tỷ lệ giảm giá"
                      type="number"
                      value={promotion.amountRate.toString()}
                      onChange={handleChange}
                      fullWidth
                    />
                  ) : (
                    <Input
                      name="amountValue"
                      label="Giá trị giảm giá (VND)"
                      placeholder="Nhập giá trị giảm giá"
                      type="number"
                      value={promotion.amountValue.toString()}
                      onChange={handleChange}
                      fullWidth
                    />
                  )}

                  <Input
                    name="minimumOrderValue"
                    label="Đơn hàng tối thiểu"
                    placeholder="Nhập giá trị đơn hàng tối thiểu"
                    type="number"
                    value={promotion.minimumOrderValue.toString()}
                    onChange={handleChange}
                    fullWidth
                  />
                  <Input
                    name="maximumApplyValue"
                    label="Giá trị tối đa"
                    placeholder="Nhập giá trị tối đa"
                    type="number"
                    value={promotion.maximumApplyValue.toString()}
                    onChange={handleChange}
                    fullWidth
                  />
                  <Input
                    name="usageLimit"
                    label="Giới hạn số lần sử dụng"
                    placeholder="Nhập số lần sử dụng tối đa"
                    type="number"
                    value={promotion.usageLimit.toString()}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
              </div>

              <Switch
                name="status"
                checked={promotion.status === PromotionStatus.Active}
                onChange={(checked) =>
                  setPromotion((prevPromotion) => ({
                    ...prevPromotion,
                    status: checked ? PromotionStatus.Active : PromotionStatus.UnActive,
                  }))
                }
              >
                {promotion.status === PromotionStatus.Active ? 'Bật hoạt động' : 'Tạm thời tắt'}
              </Switch>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Đóng
              </Button>
              <Button color="primary" onPress={handleSave}>
                Lưu
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
