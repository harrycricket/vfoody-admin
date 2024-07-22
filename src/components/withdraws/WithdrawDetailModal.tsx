import useWithdrawTargetState from '@/hooks/states/useWithdrawTargetState';
import numberFormatUtilService from '@/services/util-services/NumberFormatUtilService';
import {
  formatCurrency,
  formatDateStringYYYYMMDD_HHMM,
  formatTimeToSeconds,
} from '@/services/util-services/TimeFormatService';
import WithdrawModel, { WithdrawStatus, withdrawStatuses } from '@/types/models/WithdrawModel';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@nextui-org/react';
import { useState } from 'react';

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
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      size="4xl"
      style={{ zIndex: 100 }} // Đảm bảo modal có z-index thấp hơn
    >
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
                        ? 'w-fit bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-700 dark:text-pink-300'
                        : 'w-fit bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300'
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
                    label="Tên cửa hàng"
                    value={withdraw.shopName}
                    readOnly
                    fullWidth
                  />
                </div>
                <div className="input-container">
                  <Input name="email" label="Email" value={withdraw.email} readOnly fullWidth />
                </div>
                <div className="input-container">
                  <Input
                    name="balance"
                    label="Số dư hiện tại"
                    value={formatCurrency(withdraw.balance)}
                    readOnly
                    fullWidth
                  />
                </div>
                <div className="input-container">
                  <Input
                    name="requestedDate"
                    label="Ngày yêu cầu"
                    value={formatTimeToSeconds(withdraw.requestedDate)}
                    readOnly
                    fullWidth
                  />
                </div>
                {withdraw.status != WithdrawStatus.Pending && (
                  <div className="input-container">
                    <Input
                      name="processedDate"
                      label="Ngày xử lý"
                      value={formatTimeToSeconds(withdraw.processedDate)}
                      readOnly
                      fullWidth
                    />
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-2 justify-between">
                <div className="input-container">
                  <Input
                    name="bankShortName"
                    label="Tên ngân hàng"
                    value={withdraw.bankShortName}
                    readOnly
                    fullWidth
                  />
                </div>
                <div className="input-container">
                  <Input
                    name="bankAccountNumber"
                    label="Số tài khoản"
                    value={withdraw.bankAccountNumber}
                    readOnly
                    fullWidth
                  />
                </div>
                <div className="input-container">
                  <Input
                    name="amount"
                    label="Số tiền yêu cầu"
                    value={formatCurrency(withdraw.requestedAmount)}
                    readOnly
                    fullWidth
                  />
                </div>
                <div className="input-container">
                  <Textarea
                    name="note"
                    label="Ghi chú"
                    placeholder={withdraw.note ? '' : 'Chưa có ghi chú...'}
                    value={withdraw.note ?? ''}
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
      </ModalContent>
    </Modal>
  );
}
