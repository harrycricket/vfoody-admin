import React, { useRef, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  Image,
  Switch,
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
  const isAnyRequestSubmit = useRef(false);
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
    startDate: new Date().toDateString(),
    endDate: new Date().toDateString(),
    usageLimit: 100,
    numberOfUsed: 0,
    promotionType: '',
  });

  const [errors, setErrors] = useState<any>({});
  const validate = (promotion: PromotionModel) => {
    let tempErrors: any = {};
    if (promotion.title.length < 6) tempErrors.title = 'Tiêu đề ít nhất 6 kí tự.';
    if (
      promotion.applyType == PromotionApplyType.RateApply &&
      (promotion.amountRate < 1 || promotion.amountRate > 100)
    )
      tempErrors.amountRate = 'Tỉ lệ giảm giá nằm trong khoảng từ 1 đến 100 (%).';
    if (promotion.minimumOrderValue < 0)
      tempErrors.minimumOrderValue = 'Giá trị đơn hàng tối thiểu lớn hơn hoặc bằng 0.';
    if (promotion.maximumApplyValue < 0)
      tempErrors.maximumApplyValue = 'Giá trị áp dụng tối đa cần lớn hơn hoặc bằng 0.';
    if (promotion.applyType == PromotionApplyType.AmountApply && promotion.amountValue < 1000)
      tempErrors.amountValue = 'Giá trị giảm giá cần lớn hơn hoặc bằng 1000 đồng.';
    if (new Date(promotion.startDate) > new Date(promotion.endDate))
      tempErrors.startDate = 'Ngày bắt đầu cần trước hoặc bằng ngày kết thúc';
    if (promotion.usageLimit < 0)
      tempErrors.usageLimit = 'Giới hạn lượt sử dụng lớn hơn hoặc bằng 0.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (isAnyRequestSubmit.current) {
      validate({
        ...promotion,
        [name]: value,
      });
    }
    setPromotion((prevPromotion) => ({
      ...prevPromotion,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    isAnyRequestSubmit.current = true;
    console.log('Promotion details:', promotion, validate(promotion), errors);
    if (validate(promotion)) {
      console.log('Promotion details:', promotion);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="4xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Tạo mới chương trình khuyến mãi
            </ModalHeader>
            <ModalBody>
              <div className="flex gap-3">
                <div className="flex-1 flex flex-col gap-2">
                  <div className="input-container">
                    <Input
                      name="title"
                      label="Tiêu đề"
                      placeholder="Nhập tiêu đề chương trình khuyến mãi"
                      value={promotion.title}
                      onChange={handleChange}
                      isInvalid={errors.title ? true : false}
                      errorMessage={errors.title}
                      fullWidth
                    />
                  </div>
                  <div className="input-container">
                    <Textarea
                      name="description"
                      label="Mô tả"
                      placeholder="Nhập mô tả chương trình khuyến mãi"
                      value={promotion.description}
                      onChange={handleChange}
                      fullWidth
                    />
                  </div>
                  <Image width={'100%'} radius="md" src={promotion.bannerUrl} />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex gap-1">
                    <Input
                      name="startDate"
                      label="Ngày bắt đầu"
                      type="date"
                      value={promotion.startDate}
                      onChange={handleChange}
                      fullWidth
                      isInvalid={errors.startDate ? true : false}
                    />
                    <Input
                      name="endDate"
                      label="Ngày kết thúc"
                      type="date"
                      value={promotion.endDate}
                      onChange={handleChange}
                      fullWidth
                      isInvalid={errors.startDate ? true : false}
                    />
                  </div>
                  {errors.startDate && (
                    <span className="text-tiny text-danger">{errors.startDate}</span>
                  )}

                  <div className="input-container">
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
                  </div>
                  {promotion.applyType == PromotionApplyType.RateApply ? (
                    <div className="input-container">
                      <Input
                        name="amountRate"
                        label="Tỷ lệ giảm giá (%)"
                        placeholder="Nhập tỷ lệ giảm giá"
                        type="number"
                        value={promotion.amountRate.toString()}
                        onChange={handleChange}
                        fullWidth
                        isInvalid={errors.amountRate ? true : false}
                        errorMessage={errors.amountRate}
                      />
                    </div>
                  ) : (
                    <div className="input-container">
                      <Input
                        name="amountValue"
                        label="Giá trị giảm giá (VND)"
                        placeholder="Nhập giá trị giảm giá"
                        type="number"
                        value={promotion.amountValue.toString()}
                        onChange={handleChange}
                        fullWidth
                        isInvalid={errors.amountValue ? true : false}
                        errorMessage={errors.amountValue}
                      />
                    </div>
                  )}

                  <div className="input-container">
                    <Input
                      name="minimumOrderValue"
                      label="Đơn hàng tối thiểu"
                      placeholder="Nhập giá trị đơn hàng tối thiểu"
                      type="number"
                      value={promotion.minimumOrderValue.toString()}
                      onChange={handleChange}
                      fullWidth
                      isInvalid={errors.minimumOrderValue ? true : false}
                      errorMessage={errors.minimumOrderValue}
                    />
                  </div>
                  <div className="input-container">
                    <Input
                      name="maximumApplyValue"
                      label="Giá trị tối đa"
                      placeholder="Nhập giá trị tối đa"
                      type="number"
                      value={
                        promotion.applyType == PromotionApplyType.AmountApply
                          ? promotion.amountValue.toString()
                          : promotion.maximumApplyValue.toString()
                      }
                      readOnly={promotion.applyType == PromotionApplyType.AmountApply}
                      style={{
                        opacity: promotion.applyType === PromotionApplyType.AmountApply ? 0.7 : 1,
                      }}
                      onChange={handleChange}
                      fullWidth
                      isInvalid={errors.maximumApplyValue ? true : false}
                      errorMessage={errors.maximumApplyValue}
                    />
                  </div>
                  <div className="input-container">
                    <Input
                      name="usageLimit"
                      label="Giới hạn lượt sử dụng"
                      placeholder="Nhập số lần sử dụng tối đa"
                      type="number"
                      value={promotion.usageLimit.toString()}
                      onChange={handleChange}
                      fullWidth
                      isInvalid={errors.usageLimit ? true : false}
                      errorMessage={errors.usageLimit}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end p-2">
                <Switch
                  name="status"
                  isSelected={promotion.status == PromotionStatus.Active}
                  onValueChange={(checked) => {
                    setPromotion((prevPromotion) => ({
                      ...prevPromotion,
                      status: checked ? PromotionStatus.Active : PromotionStatus.UnActive,
                    }));
                  }}
                >
                  Trạng thái khả dụng
                </Switch>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={handleSubmit}>
                Lưu
              </Button>
              <Button color="danger" variant="flat" onPress={onClose}>
                Đóng
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
