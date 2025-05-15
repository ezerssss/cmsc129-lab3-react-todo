import clsx from "clsx";
import PencilIcon from "../assets/icons/pencil.svg";
import TrashIcon from "../assets/icons/trash-2.svg";
import { getPriorityPillStyle } from "../utils/style";
import { memo, useState } from "react";
import db from "../firebase/db";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import TaskForm from "./TaskForm";

function UndoNotification({ closeToast, data }) {
    function handleUndo() {
        data.onUndo();
        closeToast(true);
    }

    return (
        <div className="flex items-center w-full justify-between">
            <span>Task deleted</span>{" "}
            <button
                className="bg-black mr-2 px-2 py-1 rounded-md text-white text-xs cursor-pointer"
                onClick={handleUndo}
            >
                Undo
            </button>
        </div>
    );
}

function Task({ id, title, description, priority, dueDate, checked }) {
    const [checkState, setCheckState] = useState(checked);
    const [isVisible, setIsVisible] = useState(true); // Optimistic UI updates
    const [isEditOpen, setIsEditOpen] = useState(false);
    const taskDocRef = doc(db, "tasks", id);

    async function handleCheckState() {
        if (checkState) {
            setCheckState(false); // Optimistic UI update
            await updateDoc(taskDocRef, { checked: false });
        } else {
            setCheckState(true); // Optimistic UI update
            await updateDoc(taskDocRef, { checked: true });
        }
    }

    async function handleDelete() {
        const { isConfirmed } = await Swal.fire({
            title: "Confirm deletion",
            text: "Do you want to continue?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirm",
            confirmButtonColor: "#fb2c36",
        });

        if (!isConfirmed) {
            return;
        }

        setIsVisible(false);
        toast.info(UndoNotification, {
            onClose: (removedByUser) => {
                if (removedByUser) {
                    return;
                }

                deleteDoc(taskDocRef);
            },
            data: {
                onUndo: () => setIsVisible(true),
            },
        });
    }

    if (!isVisible) return null;

    return (
        <li className="mb-4">
            <div className="flex justify-between border-gray-300 border p-4 rounded-lg gap-10">
                <div className="flex gap-2 flex-1">
                    <input
                        type="checkbox"
                        checked={checkState}
                        onChange={handleCheckState}
                    />
                    <div>
                        <p className="text-gray-500 text-xs">
                            #{id.substring(0, 7)}...
                        </p>
                        <h2 className="font-bold text-lg">{title}</h2>
                        <p className="text-sm">{description}</p>
                        <div className="flex gap-2 items-center mt-1 text-sm">
                            <div
                                className={clsx(
                                    "rounded-xl text-white w-fit px-2",
                                    getPriorityPillStyle(priority),
                                )}
                            >
                                {priority}
                            </div>
                            <p className="text-gray-500">
                                {new Date(dueDate).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 w-6 max-w-6 overflow-hidden">
                    <button
                        className="block cursor-pointer hover:scale-110 transition-all"
                        onClick={() => setIsEditOpen((prev) => !prev)}
                    >
                        <img className="w-full" src={PencilIcon} alt="edit" />
                    </button>
                    <button
                        className="block cursor-pointer hover:scale-110 transition-all"
                        onClick={handleDelete}
                    >
                        <img className="w-full" src={TrashIcon} alt="delete" />
                    </button>
                </div>
            </div>
            <TaskForm
                initialData={{
                    id,
                    title,
                    description,
                    priority,
                    dueDate,
                }}
                isOpen={isEditOpen}
                setIsOpen={setIsEditOpen}
            />
        </li>
    );
}

export default memo(Task);
