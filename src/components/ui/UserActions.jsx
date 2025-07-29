import { Pencil, Trash2, XCircle, CheckCircle } from 'lucide-react';

export default function UserActions({
    onEdit,
    onDelete,
    onCancel,
    onComplete,
    userType,
    status,
    variant = 'default',
}) {
    const containerClass =
        variant === 'compact'
        ? 'md:col-span-4 flex justify-start md:justify-end space-x-2'
        : 'md:flex flex-col gap-4';

    return (
        <div className={containerClass}>
            <span className="font-semibold md:hidden mr-3">Ações: </span>

            <button
                onClick={onEdit}
                className="text-blue-600 hover:text-blue-800 transition-colors"
                title="Editar"
                type="button"
            >
                <Pencil className="w-5 h-5" />
            </button>

            {onDelete && (
                <button
                    onClick={onDelete}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Deletar"
                    type="button"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            )}

            {status === 'scheduled' && (
                <>
                    <button
                        onClick={onCancel}
                        className="text-red-600 hover:text-red-800 transition-colors mx-3 pt-6 md:mx-0 md:pt-0"
                        title="Cancelar"
                        type="button"
                    >
                        <XCircle className="w-5 h-5" />
                    </button>

                    {userType === 'doctor' && (
                        <button
                            onClick={onComplete}
                            className="text-green-600 hover:text-green-800 transition-colors"
                            title="Concluir"
                            type="button"
                        >
                            <CheckCircle className="w-5 h-5" />
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
