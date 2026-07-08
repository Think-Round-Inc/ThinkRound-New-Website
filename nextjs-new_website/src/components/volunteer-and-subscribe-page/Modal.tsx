type ModalProps = {
  message: string;
  onClose: () => void;
  title: string;
  textColor: string;
};

export default function Modal({
  message,
  onClose,
  title,
  textColor,
}: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2
          id="error-modal-title"
          className="text-2xl font-semibold mb-3 "
          style={{ color: textColor }}
        >
          {title}
        </h2>
        <p className="mb-6 text-xl text-gray-700">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="rounded bg-purple-900 py-3 px-7 text-white text-xl"
        >
          Close
        </button>
      </div>
    </div>
  );
}
