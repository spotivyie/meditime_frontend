//components
import Button from "../ui/Button";
import CloseButton from "../ui/CloseButton";
import HourPicker from "../ui/HourPicker";
import Input from "../ui/Input";
import InputDate from "../ui/InputDate";
import ModalCard from "../ui/ModalCard";

export default function AppointmentEdit({
  app,
  editForm,
  setEditForm,
  availableHours,
  loadingHours,
  onChange,
  onSave,
  onCancel,
}) {

  return (
    <ModalCard className="max-w-xl">
      <div>
        <InputDate 
          label="Data" 
          type="date" 
          name="date" 
          value={editForm.date} 
          onChange={onChange}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>
      <div>
        <HourPicker
          label="Horário"
          hours={availableHours}
          selected={editForm.hour}
          onSelect={(hour) => setEditForm((prev) => ({ ...prev, hour }))}
          loading={loadingHours}
        />
      </div>
      <div>
        <Input
          label="Observações"
          name="notes"
          value={editForm.notes}
          onChange={onChange}
          textarea
          rows={3}
        />
      </div>
      <div className="flex gap-4">
        <Button onClick={onSave} fullWidth>Salvar Alterações</Button>
        <CloseButton onClick={onCancel} className="ml-auto" />
      </div>
    </ModalCard>
  );
}
