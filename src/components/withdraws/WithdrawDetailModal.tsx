import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from '@nextui-org/react';
import WithdrawModel, { WithdrawStatus, withdrawStatuses } from '@/types/models/WithdrawModel';
import useWithdrawTargetState from '@/hooks/states/useWithdrawTargetState';
import numberFormatUtilService from '@/services/util-services/NumberFormatUtilService';

interface WithdrawDetailModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  onApprove: (withdraw: WithdrawModel) => void;
  onReject: (withdraw: WithdrawModel) => void;
}

export default function WithdrawDetailModal({
  isOpen,
  onOpenChange,
  onOpen,
  onClose,
  onApprove,
  onReject,
}: WithdrawDetailModalProps) {
  const { model: withdraw } = useWithdrawTargetState();
  const [note, setNote] = useState('');
  const [reason, setReason] = useState('');

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="4xl">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 justify-start items-center">
                <p>
                  {'#' +
                    numberFormatUtilService.hashId(withdraw.requestId) +
                    ' | ' +
                    withdraw.shopName}
                </p>
                <span
                  className={
                    withdraw.status === WithdrawStatus.Approved
                      ? 'w-fit bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'
                      : withdraw.status === WithdrawStatus.Rejected
                        ? 'w-fit bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300'
                        : 'w-fit bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300'
                  }
                >
                  {withdrawStatuses.find((item) => item.key === withdraw.status)?.label}
                </span>
              </div>
              <div className="flex gap-2 items-center mr-4">
                {withdraw.status === WithdrawStatus.Pending && (
                  <>
                    <Button color="secondary" variant="ghost" onClick={() => onApprove(withdraw)}>
                      Duyệt
                    </Button>
                    <Button color="danger" variant="ghost" onClick={() => onReject(withdraw)}>
                      Từ chối
                    </Button>
                  </>
                )}
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="flex gap-3">
              <div className="flex-1 flex flex-col gap-2">
                <div className="input-container">
                  <Input
                    name="shopName"
                    label="Tên Shop"
                    placeholder="Nhập tên Shop"
                    value={withdraw.shopName}
                    readOnly
                    fullWidth
                  />
                </div>
                <div className="input-container">
                  <Textarea
                    name="description"
                    label="Mô tả"
                    placeholder={withdraw.bankCode ? '' : 'Chưa có mô tả...'}
                    value={withdraw.bankCode.toString()}
                    readOnly
                    fullWidth
                  />
                </div>
                <div className="input-container">
                  <Input
                    name="amount"
                    label="Số tiền"
                    placeholder="Nhập số tiền"
                    value={withdraw.bankCode.toString()}
                    readOnly
                    fullWidth
                  />
                </div>
                <div className="input-container">
                  <Select
                    name="status"
                    label="Trạng thái"
                    selectedKeys={new Set([withdraw.status.toString()])}
                    isDisabled={true}
                    fullWidth
                  >
                    {withdrawStatuses.map((status) => (
                      <SelectItem key={status.key} value={status.key}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                {withdraw.status === WithdrawStatus.Pending && (
                  <>
                    <div className="input-container">
                      <Textarea
                        name="note"
                        label="Ghi chú"
                        placeholder="Nhập ghi chú"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        fullWidth
                      />
                    </div>
                    <div className="input-container">
                      <Textarea
                        name="reason"
                        label="Lý do từ chối"
                        placeholder="Nhập lý do từ chối"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        fullWidth
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Đóng
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
