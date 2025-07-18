"use client";

import { createNewLeadList } from "@/_utility/fetchers/leads/create-new-list.fetcher";
import { parseExcelToSuperLeads } from "@/_utility/helpers/parse-excel-to-super-leads.helper";
import React, { useState, ChangeEvent, DragEvent } from "react";
import toast from "react-hot-toast";

/**
 * Props for the ListLoader component.
 */
interface ListLoaderProps {
    /**
     * Callback used to refresh the lead list view after uploading.
     */
    refreshLists: () => void;
}

/**
 * `ListLoader` Component
 *
 * A UI component that enables users to upload Excel (.xls/.xlsx) files and convert them into structured lead lists.
 * Includes drag-and-drop support, name validation, and upload feedback via `react-hot-toast`.
 *
 * @param {ListLoaderProps} props - Component props including `refreshLists`
 * @returns {JSX.Element}
 */
const ListLoader: React.FC<ListLoaderProps> = ({ refreshLists }) => {
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState<string | null>(null);
    const [nameError, setNameError] = useState<string | null>(null);

    /**
     * Handles manual file selection via the file input.
     *
     * @param e - Change event from file input
     */
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) await handleProcessFile(selected);
    };

    /**
     * Handles file dropped via drag-and-drop area.
     *
     * @param e - Drag event from drop target
     */
    const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) await handleProcessFile(droppedFile);
    };

    /**
     * Parses, uploads, and creates a new lead list from a selected Excel file.
     *
     * @param selectedFile - The uploaded Excel file
     */
    const handleProcessFile = async (selectedFile: File) => {
        if (!name || name.trim() === "") {
            setNameError("Please enter a name for your lead list.");
            toast.error("⚠️ List name is required before uploading.");
            return;
        }

        try {
            setLoading(true);
            setNameError(null);
            setFile(selectedFile);

            const toastId = toast.loading("📤 Uploading and processing leads...");

            const leads = await parseExcelToSuperLeads(selectedFile, "preforeclosure");
            const result = await createNewLeadList(leads, name.trim());

            if (result.success) {
                toast.success(`✅ Uploaded ${result.count} leads to "${name}"`, { id: toastId });
                refreshLists();
                setFile(null);
                setName(null);
            } else {
                console.error(result.error);
                toast.error("❌ Upload failed. Check console.", { id: toastId });
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            toast.error("❌ Something went wrong while processing.");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Resets the uploaded file selection.
     */
    const handleRemoveFile = () => {
        setFile(null);
    };

    return (
        <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition relative">
            {/* Name input */}
            <div className="mb-4 text-left">
                <label htmlFor="list-name" className="block text-sm font-medium text-gray-700 mb-1">
                    List Name <span className="text-red-500">*</span>
                </label>
                <input
                    id="list-name"
                    type="text"
                    placeholder="e.g. Detroit Preforeclosures - July"
                    value={name ?? ""}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-md text-sm ${nameError ? "border-red-500" : "border-gray-300"
                        }`}
                    disabled={loading}
                />
                {nameError && <p className="text-xs text-red-500 mt-1">{nameError}</p>}
            </div>

            {/* Drop/upload area */}
            <div
                className={`rounded-lg py-6 border-2 border-dashed transition ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                    }`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput")?.click()}
            >
                <input
                    id="fileInput"
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {file ? (
                    <div className="flex flex-col items-center gap-2">
                        <p className="font-medium text-sm">{file.name}</p>
                        <button
                            onClick={handleRemoveFile}
                            className="text-red-500 underline text-sm"
                            disabled={loading}
                        >
                            Remove File
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-600 text-sm">
                        Drag and drop your Excel file here, or{" "}
                        <span className="text-blue-600 underline">click to upload</span>.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ListLoader;
