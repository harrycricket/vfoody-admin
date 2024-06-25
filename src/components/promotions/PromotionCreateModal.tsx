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
  initPromotionSampleObject,
} from '@/types/models/PromotionModel';
import { promotionApiService } from '@/services/api-services/api-service-instances';
import usePromotionTargetState from '@/hooks/states/usePromotionTargetState';
import MutationResponse from '@/types/responses/MutationReponse';
import {
  convertDateTimeToISO,
  formatDateStringYYYYMMDD,
  formatDateStringYYYYMMDD_HHMM,
} from '@/services/util-services/TimeFormatService';
import Swal from 'sweetalert2';

interface CreatePromotionModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  onHandleSubmitSuccess: (promotion: PromotionModel) => void;
}

export default function PromotionCreateModal({
  isOpen,
  onOpen,
  onOpenChange,
  onClose,
  onHandleSubmitSuccess,
}: CreatePromotionModalProps) {
  const isAnyRequestSubmit = useRef(false);
  const [promotion, setPromotion] = useState<PromotionModel>({ ...initPromotionSampleObject });

  const [errors, setErrors] = useState<any>({});
  const validate = (promotion: PromotionModel) => {
    console.log('Validating promotion: ', promotion);
    let tempErrors: any = {};
    if (promotion.title.length < 6) tempErrors.title = 'Tiêu đề ít nhất 6 kí tự.';
    if (
      promotion.applyType == PromotionApplyType.RateApply &&
      (promotion.amountRate < 1 || promotion.amountRate > 100)
    )
      tempErrors.amountRate = 'Tỉ lệ giảm giá nằm trong khoảng từ 1 đến 100 (%).';
    if (promotion.minimumOrderValue < 1000)
      tempErrors.minimumOrderValue = 'Giá trị đơn hàng tối thiểu lớn hơn hoặc bằng 1000 đồng.';
    if (promotion.maximumApplyValue < 0)
      tempErrors.maximumApplyValue = 'Giá trị áp dụng tối đa cần lớn hơn hoặc bằng 0.';
    if (promotion.applyType == PromotionApplyType.AmountApply && promotion.amountValue < 1000)
      tempErrors.amountValue = 'Giá trị giảm giá cần lớn hơn hoặc bằng 1000 đồng.';
    if (new Date(promotion.startDate) > new Date(promotion.endDate))
      tempErrors.startDate = 'Thời gian bắt đầu cần trước hoặc bằng ngày kết thúc';
    if (promotion.usageLimit < 0)
      tempErrors.usageLimit = 'Giới hạn lượt sử dụng lớn hơn hoặc bằng 0.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const numericFields = [
    'id',
    'amountRate',
    'minimumOrderValue',
    'maximumApplyValue',
    'amountValue',
    'applyType',
    'status',
    'usageLimit',
    'numberOfUsed',
    'promotionType',
  ];
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const newValue = numericFields.includes(name) ? Number(value) : value;

    if (isAnyRequestSubmit.current) {
      validate({
        ...promotion,
        [name]: newValue,
      });
    }

    setPromotion((prevPromotion) => ({
      ...prevPromotion,
      [name]: newValue,
    }));
  };

  const handleSubmit = () => {
    isAnyRequestSubmit.current = true;
    console.log('Promotion details:', promotion, validate(promotion), errors);
    if (validate(promotion)) {
      promotion.startDate = convertDateTimeToISO(promotion.startDate);
      promotion.endDate = convertDateTimeToISO(promotion.endDate);
      promotionApiService
        .create(promotion)
        .then((res) => {
          let result = res.data as MutationResponse<PromotionModel>;
          if (result.isSuccess) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Tạo mới thành công',
              showConfirmButton: false,
              timer: 1500,
            });
            onHandleSubmitSuccess({ ...promotion, ...result.value });

            // set to init
            isAnyRequestSubmit.current = false;
            setPromotion({ ...initPromotionSampleObject });
            onClose();
          } else {
            if (result.error.code == '500') {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oh no, lỗi máy chủ!',
                text: 'Máy chủ gặp sự cố trong quá trình tạo mới, vui lòng thử lại!',
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oh no!',
                text: 'Gặp lỗi trong quá trình tạo mới, vui lòng thử lại: ' + result.error.message,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          }
        })
        .catch((err) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Oh no, lỗi máy chủ!',
            text: 'Máy chủ gặp sự cố trong quá trình tạo mới, vui lòng thử lại!',
            showConfirmButton: false,
            timer: 1500,
          });
        });
      promotion.startDate = formatDateStringYYYYMMDD_HHMM(promotion.startDate);
      promotion.endDate = formatDateStringYYYYMMDD_HHMM(promotion.endDate);
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
                      required
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
                      label="Thời gian bắt đầu"
                      type="datetime-local"
                      required
                      value={promotion.startDate}
                      onChange={handleChange}
                      fullWidth
                      isInvalid={errors.startDate ? true : false}
                    />
                    <Input
                      name="endDate"
                      label="Thời gian kết thúc"
                      type="datetime-local"
                      required
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
