'use client';
import { invoices } from '@/config';
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const dates = [
    {
        date: 'Wed, 25th Aug 2024',
    },
    {
        date: 'Fri, 15th Sept 2024',
    },
    {
        date: 'Tues, 24th Oct 2024',
    },
    {
        date: 'Mon, 4th Nov 2024',
    },
    {
        date: 'Dec, 12th Dec 2024',
    },
    {
        date: 'Jan, 20th Jan 2025',
    },
];
const ViewRecords = () => {
    let [isOpen, setIsOpen] = useState(false);
    const data = invoices[3];
    const handleCopyStatic = (attestationId: string, zkProof: any) => {
        const targetEasID = attestationId;
        navigator.clipboard
            .writeText(JSON.stringify(zkProof))
            .then(() => {
                toast.success('Zk proof copied to clipboard');
                toast.loading(
                    'You will be redirected to the external link shortly.'
                );
                setTimeout(() => {
                    toast.dismiss();
                    window.open(
                        `https://base-sepolia.easscan.org/attestation/view/${targetEasID}`,
                        '_blank'
                    );
                }, 5000);
            })
            .catch((err) => {
                toast.error('Failed to copy Zk proof to clipboard');
                console.error('Error copying to clipboard:', err);
            });
    };
    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }
    return (
        <>
            <div className="py-16 flex items-center gap-x-12">
                <div className="w-full max-w-md rounded-xl shadow-xl bg-[#EDF9FC] p-6 border border-[#52D2CF] font-semibold">
                    Medical Records
                    <div className="py-3">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="font-semibold">
                                Name{' '}
                                <div className="font-medium">{data.name}</div>
                            </div>
                            <div className="font-semibold">
                                Age{' '}
                                <div className="font-medium">{data.age}</div>
                            </div>{' '}
                            <div className="font-semibold">
                                Gender{' '}
                                <div className="font-medium">{data.gender}</div>
                            </div>
                            <div className="font-semibold">
                                Diagnose{' '}
                                <div className="font-medium">
                                    {data.diagnoses}
                                </div>
                            </div>
                            <div className="font-semibold">
                                Blood Type{' '}
                                <div className="font-medium">
                                    {data.bloodType}
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() =>
                                handleCopyStatic(
                                    data.attestationId,
                                    data.zkProof
                                )
                            }
                            className="bg-themelinear px-6 py-2 mt-5 w-fit rounded-lg text-white font-semibold flex items-center gap-x-2 cursor-pointer"
                        >
                            Verify
                        </div>
                    </div>
                </div>
                <div className="w-full h-[350px]  max-w-md rounded-xl shadow-xl bg-[#EDF9FC] p-6 border border-[#52D2CF] font-semibold">
                    Doctor Records
                    <div className="py-3">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="font-semibold">
                                Medication{' '}
                                <div className="font-medium">
                                    {data.medication}
                                </div>
                            </div>
                            <div className="font-semibold">
                                Dosage{' '}
                                <div className="font-medium">{data.dosage}</div>
                            </div>{' '}
                            <div className="font-semibold">
                                Duration{' '}
                                <div className="font-medium">
                                    {data.duration}
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() =>
                                handleCopyStatic(
                                    data.docAttestationId || '',
                                    data.docZkProof
                                )
                            }
                            className="mt-20 bg-themelinear px-6 py-2  w-fit rounded-lg text-white font-semibold flex items-center gap-x-2 cursor-pointer"
                        >
                            Verify
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-sm text-center">
                As per diagnoses 6 months is required*
            </p>
            <div
                onClick={open}
                className="text-center mx-auto bg-themelinear px-6 py-2 mt-5 w-fit rounded-lg text-white font-semibold flex items-center gap-x-2 cursor-pointer"
            >
                Start Treatment
            </div>
            <Transition appear show={isOpen}>
                <Dialog
                    open={isOpen}
                    as="div"
                    className="relative z-10 focus:outline-none"
                    onClose={close}
                >
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                                <DialogPanel
                                    transition
                                    className="w-full max-w-md rounded-xl shadow-2xl bg-[#EDF9FC] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                                >
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale: 0.8,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <DialogTitle
                                            as="h3"
                                            className=" font-medium text-black text-center"
                                        >
                                            Treatment Scheduled Successfully
                                        </DialogTitle>

                                        <div className="flex flex-wrap items-center justify-center gap-4 py-6 text-sm">
                                            {dates.map((elem, index) => (
                                                <div
                                                    key={index}
                                                    className="border border-[#52D2CF] rounded-lg p-2 cursor-pointer"
                                                >
                                                    {elem.date}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default ViewRecords;
