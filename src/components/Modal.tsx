const Modal = () => {
    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            >
                <h2 className="mb-3 text-2xl font-bold">Modal window</h2>
                <p className="mb-6 text-stone-700">
                    This is one simple modal without any id.
                </p>

                <button
                    onClick={onClose}
                    className="rounded-lg bg-stone-900 px-4 py-2 text-white"
                >
                    Close
                </button>
            </div>
        </div>
    );
    );
};

export default Modal;