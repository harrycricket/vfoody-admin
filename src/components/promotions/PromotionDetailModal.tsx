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
import { promotionApiService } from '@/services/api-services/api-service-instances';
import usePromotionTargetState from '@/hooks/states/usePromotionTargetState';
import MutationResponse from '@/types/responses/MutationReponse';
import numberFormatUtilService from '@/services/util-services/NumberFormatUtilService';
import {
  formatDate,
  formatDateString,
  formatDateStringYYYYMMDD_HHMM,
} from '@/services/util-services/TimeFormatService';

interface CreatePromotionModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  onToUpdate: () => void;
  onToDelete: () => void;
  onToRecover: () => void;
}

export default function PromotionDetailModal({
  isOpen,
  onOpen,
  onOpenChange,
  onClose,
  onToUpdate,
  onToDelete,
  onToRecover,
}: CreatePromotionModalProps) {
  const { model: promotion } = usePromotionTargetState();
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="4xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 justify-start items-center">
                  <p>
                    {'#' + numberFormatUtilService.hashId(promotion.id) + ' | ' + promotion.title}
                  </p>
                  <span
                    className={
                      promotion.status == 1
                        ? 'w-fit bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'
                        : promotion.status == 2
                          ? 'w-fit bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300'
                          : 'w-fit bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300'
                    }
                  >
                    {promotionStatuses.find((item) => item.key == promotion.status)?.label}
                  </span>
                </div>
                <div className="flex gap-2 items-center mr-4">
                  <Button color="secondary" variant="ghost" onClick={() => onToUpdate()}>
                    Chỉnh sửa
                  </Button>
                  {promotion.status == PromotionStatus.Deleted ? (
                    <Button color="danger" variant="ghost" onClick={() => onToRecover()}>
                      Khôi phục
                    </Button>
                  ) : (
                    <Button color="danger" variant="ghost" onClick={() => onToDelete()}>
                      Xóa
                    </Button>
                  )}
                </div>
              </div>
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
                      readOnly
                      fullWidth
                    />
                  </div>
                  <div className="input-container">
                    <Textarea
                      name="description"
                      label="Mô tả"
                      placeholder={promotion.description ? '' : 'Chưa có mô tả...'}
                      value={promotion.description}
                      readOnly
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
                      type="text"
                      value={formatDateStringYYYYMMDD_HHMM(promotion.startDate)}
                      readOnly
                      fullWidth
                    />
                    <Input
                      name="endDate"
                      label="Thời gian kết thúc"
                      type="text"
                      value={formatDateStringYYYYMMDD_HHMM(promotion.endDate)}
                      fullWidth
                      readOnly
                    />
                  </div>

                  <div className="input-container">
                    <Select
                      name="applyType"
                      label="Loại áp dụng"
                      selectedKeys={new Set([promotion.applyType.toString()])}
                      isDisabled={true}
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
                        readOnly
                        fullWidth
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
                        readOnly
                        fullWidth
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
                      readOnly
                      fullWidth
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
                      style={{
                        opacity: promotion.applyType === PromotionApplyType.AmountApply ? 0.7 : 1,
                      }}
                      fullWidth
                      readOnly
                    />
                  </div>
                  <div className="input-container">
                    <Input
                      name="usageLimit"
                      label="Giới hạn lượt sử dụng"
                      placeholder="Nhập số lần sử dụng tối đa"
                      type="number"
                      value={promotion.usageLimit.toString()}
                      readOnly
                      fullWidth
                    />
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
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
