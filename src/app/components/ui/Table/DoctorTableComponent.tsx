'use client';
import { invoices } from '@/config';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './TableComponents';
import { RxAvatar } from 'react-icons/rx';
import { CiCircleCheck } from 'react-icons/ci';
import DoctorModal from '../doctor/doctorModal';
import ViewMedicalModal from '../MedicalModal/ViewModal';
const DoctorTableComponent = () => {
    return (
        <Table>
            <TableCaption>A list of your recent records.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">S.no</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Consultation On</TableHead>
                    <TableHead>Medical Record</TableHead>
                    <TableHead>Prescription</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => {
                    return (
                        <TableRow key={invoice.invoice}>
                            <TableCell className="font-medium">
                                {invoice.invoice}
                            </TableCell>
                            <TableCell className="flex items-center gap-x-2">
                                <RxAvatar size={30} /> {invoice.name}
                            </TableCell>
                            <TableCell>{invoice.date}</TableCell>
                            <TableCell>
                                <div>
                                    <div className="flex items-center gap-x-4">
                                        <ViewMedicalModal />

                                        <div className="border-2 rounded-xl px-4 py-2 cursor-pointer">
                                            Validate
                                        </div>
                                    </div>
                                    <div className="font-medium gap-x-1 pt-2 text-sm flex pl-4">
                                        Onchain Attested
                                        <CiCircleCheck
                                            color="green"
                                            size={25}
                                        />
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell className="w-fit flex items-center gap-x-4">
                                <DoctorModal
                                    // name={invoice.name}
                                    // age={invoice.age}
                                    // gender={invoice.gender}
                                    attestationId={invoice.attestationId}
                                    address={invoice.address}
                                />
                            </TableCell>
                            <TableCell className="text-right">
                                {invoice.paymentStatus}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default DoctorTableComponent;
