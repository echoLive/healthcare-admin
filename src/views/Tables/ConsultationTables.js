import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
// @material-ui/icons
import Dvr from '@material-ui/icons/Dvr';
import Close from '@material-ui/icons/Close';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
// core components
import CustomInput from 'components/CustomInput/CustomInput.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardIcon from '../../components/Card/CardIcon.js';
import CardHeader from 'components/Card/CardHeader.js';
import ReactTableBottomPagination from '../../components/ReactTableBottomPagination/ReactTableBottomPagination.js';

import { cardTitle } from '../../assets/jss/material-dashboard-pro-react.js';

const styles = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: '15px',
        marginBottom: '0px',
    },
};

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function ConsultationTables() {
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [deleteConsId, setDeleteConsId] = useState(null);
    const [newBookingId, setNnewBookingId] = useState('');
    const [newExamination, setNewExamination] = useState('');
    const [newDiagnosis, setNewDiagnosis] = useState('');
    const [newFollowUp, setNewFollowUp] = useState('');
    const [newMedication, setNewMedication] = useState('');
    const [newBodyTemp, setNewBodyTemp] = useState('');
    const [newPulseRate, setNewPulseRate] = useState('');
    const [newRespirationRate, setNewRespirationRate] = useState('');
    const [newBloodPressure, setNewBloodPressure] = useState('');
    const [newWeight, setNewWeight] = useState('');
    const [newHeight, setNewHeight] = useState('');

    const classes = useStyles();

    const setConsultationParam = (info) => {
        const { booking_id, examination, diagnosis, follow_up, medication, body_temp, pulse_rate, respiration_rate, blood_pressure, weight, height, } = info;
        setNnewBookingId(booking_id);
        setNewExamination(examination);
        setNewDiagnosis(diagnosis);
        setNewFollowUp(follow_up);
        setNewMedication(medication);
        setNewBodyTemp(body_temp);
        setNewPulseRate(pulse_rate);
        setNewRespirationRate(respiration_rate);
        setNewBloodPressure(blood_pressure);
        setNewWeight(weight);
        setNewHeight(height);
    };

    const makeTableRow = (info) => {
        return {
            ...info,
            actions: (
                <div className="actions-right">
                    <Button
                        justIcon
                        round
                        simple
                        onClick={() => {
                            setConsultationParam(info);
                            setDeleteConsId(info.id);
                            setEditModal(true);
                        }}
                        color="warning"
                        className="edit"
                    >
                        <Dvr />
                    </Button>
                    <Button
                        justIcon
                        round
                        simple
                        onClick={() => {
                            setDeleteConsId(info.id);
                            setDeleteModal(true);
                        }}
                        color="danger"
                        className="remove"
                    >
                        <Close />
                    </Button>
                </div>
            ),
        };
    };

    const getCons = () => {
        axios.get('/api/consultations/').then((res) => {
            setData(res.data.consultations.map((prop) => makeTableRow(prop)));
        });
    };

    useEffect(getCons, []);

    const delteCons = (deleteId) => {
        axios.delete(`/api/consultations/${deleteId}`).then(() => {
            setData(data.filter((prop) => prop.id !== deleteId));
        });
    };

    const addCons = () => {
        axios
            .post('/api/consultations/', {
                booking_id: newBookingId,
                examination: newExamination,
                diagnosis: newDiagnosis,
                follow_up: newFollowUp,
                medication: newMedication,
                body_temp: newBodyTemp,
                pulse_rate: newPulseRate,
                respiration_rate: newRespirationRate,
                blood_pressure: newBloodPressure,
                weight: newWeight,
                height: newHeight,
            })
            .then((res) => {
                setData([...data, makeTableRow(res.data.consultation)]);
                setAddModal(false);
            });
    };

    const updateCons = () => {
        axios
            .patch(`/api/consultations/${deleteConsId}`, {
                booking_id: newBookingId,
                examination: newExamination,
                diagnosis: newDiagnosis,
                follow_up: newFollowUp,
                medication: newMedication,
                body_temp: newBodyTemp,
                pulse_rate: newPulseRate,
                respiration_rate: newRespirationRate,
                blood_pressure: newBloodPressure,
                weight: newWeight,
                height: newHeight,
            })
            .then((res) => {
                setData(
                    data.map((prop) =>
                        prop.id === deleteConsId ? makeTableRow(res.data.consultation) : prop
                    )
                );
                setEditModal(false);
            });
    };

    return (
        <GridContainer>
            <GridItem xs={12}>
                {/* {moment().format('HH:mm:ss.SSS')} */}
                <Card>
                    <CardHeader color="primary" icon>
                        <CardIcon color="primary">
                            <RecordVoiceOverIcon />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Consultation</h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer justify="flex-end">
                            <GridItem>
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        setConsultationParam({
                                            booking_id: '',
                                            examination: '',
                                            diagnosis: '',
                                            follow_up: '',
                                            medication: '',
                                            body_temp: '',
                                            pulse_rate: '',
                                            respiration_rate: '',
                                            blood_pressure: '',
                                            weight: '',
                                            height: '',
                                        });

                                        setAddModal(true);
                                    }}
                                >
                                    Add Consultation
                                </Button>
                            </GridItem>
                        </GridContainer>
                        <ReactTableBottomPagination
                            columns={[
                                {
                                    Header: 'Booking ID',
                                    accessor: 'booking_id',
                                },
                                {
                                    Header: 'Examination',
                                    accessor: 'examination',
                                },
                                {
                                    Header: 'Diagnosis',
                                    accessor: 'diagnosis',
                                },
                                {
                                    Header: 'Follow Up',
                                    accessor: 'follow_up',
                                },
                                {
                                    Header: 'Medication',
                                    accessor: 'medication',
                                },
                                {
                                    Header: 'Body Temp',
                                    accessor: 'body_temp',
                                },
                                {
                                    Header: 'Pulse Rate',
                                    accessor: 'pulse_rate',
                                },
                                {
                                    Header: 'Respiration Rate',
                                    accessor: 'respiration_rate',
                                },
                                {
                                    Header: 'Blood Pressure',
                                    accessor: 'blood_pressure',
                                },
                                {
                                    Header: 'Weight',
                                    accessor: 'weight',
                                },
                                {
                                    Header: 'Height',
                                    accessor: 'height',
                                },
                                {
                                    Header: 'Actions',
                                    accessor: 'actions',
                                },
                            ]}
                            data={data}
                        />
                        <Dialog
                            classes={{
                                root: classes.center + ' ' + classes.modalRoot,
                                paper: classes.modal + ' ' + classes.modalSmall,
                            }}
                            open={deleteModal}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={() => setDeleteModal(false)}
                            aria-describedby="small-modal-slide-description"
                        >
                            <DialogContent
                                id="small-modal-slide-description"
                                className={classes.modalBody + ' ' + classes.modalSmallBody}
                            >
                                <h5>Are you sure you want to delete this consu?</h5>
                            </DialogContent>
                            <DialogActions
                                className={
                                    classes.modalFooter + ' ' + classes.modalFooterCenter
                                }
                            >
                                <Button
                                    onClick={() => setDeleteModal(false)}
                                    color="transparent"
                                    className={classes.modalSmallFooterFirstButton}
                                >
                                    Never Mind
                                </Button>
                                <Button
                                    onClick={() => {
                                        setDeleteModal(false);
                                        delteCons(deleteConsId);
                                    }}
                                    color="success"
                                    simple
                                    className={
                                        classes.modalSmallFooterFirstButton +
                                        ' ' +
                                        classes.modalSmallFooterSecondButton
                                    }
                                >
                                    Yes
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            classes={{
                                root: classes.center + ' ' + classes.modalRoot,
                                paper: classes.modal + ' ' + classes.modalSmall,
                            }}
                            open={addModal}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={() => setDeleteModal(false)}
                            aria-labelledby="add-driver-dialog-title-modal-title"
                            aria-describedby="add-driver-dialog-modal-description"
                        >
                            <DialogTitle
                                id="add-driver-dialog-title-modal-title"
                                disableTypography
                                className={classes.modalHeader}
                            >
                                <h4 className={classes.modalTitle}>Add Consultation</h4>
                            </DialogTitle>
                            <DialogContent
                                id="add-driver-dialog-modal-description"
                                className={classes.modalBody + ' ' + classes.modalSmallBody}
                            >
                                <form>
                                    <CustomInput
                                        labelText="Booking ID"
                                        id="add_booking_id"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newBookingId,
                                            onChange: (e) => setNnewBookingId(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Examination"
                                        id="add_examination"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newExamination,
                                            onChange: (e) => setNewExamination(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Diagnosis"
                                        id="add_diagnosis"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newDiagnosis,
                                            onChange: (e) => setNewDiagnosis(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Follow Up"
                                        id="add_follow_up"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newFollowUp,
                                            onChange: (e) => setNewFollowUp(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Medication"
                                        id="add_medication"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newMedication,
                                            onChange: (e) => setNewMedication(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Body Temp"
                                        id="add_body_temp"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newBodyTemp,
                                            onChange: (e) => setNewBodyTemp(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Pulse Rate"
                                        id="add_pulse_rate"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newPulseRate,
                                            onChange: (e) => setNewPulseRate(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Respiration Rate"
                                        id="add_respiration_rate"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newRespirationRate,
                                            onChange: (e) => setNewRespirationRate(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Blood Pressure"
                                        id="add_blood_pressure"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newBloodPressure,
                                            onChange: (e) => setNewBloodPressure(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Weight"
                                        id="add_weight"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newWeight,
                                            onChange: (e) => setNewWeight(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Height"
                                        id="add_height"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newHeight,
                                            onChange: (e) => setNewHeight(e.target.value),
                                        }}
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setAddModal(false)}>Cancel</Button>
                                <Button onClick={() => addCons()} color="primary">Add</Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            classes={{
                                root: classes.center + ' ' + classes.modalRoot,
                                paper: classes.modal + ' ' + classes.modalSmall,
                            }}
                            open={editModal}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={() => setDeleteModal(false)}
                            aria-labelledby="edit-driver-dialog-title-modal-title"
                            aria-describedby="edit-driver-dialog-modal-description"
                        >
                            <DialogTitle
                                id="edit-driver-dialog-title-modal-title"
                                disableTypography
                                className={classes.modalHeader}
                            >
                                <h4 className={classes.modalTitle}>Edit Consultation</h4>
                            </DialogTitle>
                            <DialogContent
                                id="edit-driver-dialog-modal-description"
                                className={classes.modalBody + ' ' + classes.modalSmallBody}
                            >
                                <form>
                                    <CustomInput
                                        labelText="Booking ID"
                                        id="add_booking_id"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newBookingId,
                                            onChange: (e) => setNnewBookingId(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Examination"
                                        id="add_examination"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newExamination,
                                            onChange: (e) => setNewExamination(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Diagnosis"
                                        id="add_diagnosis"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newDiagnosis,
                                            onChange: (e) => setNewDiagnosis(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Follow Up"
                                        id="add_follow_up"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newFollowUp,
                                            onChange: (e) => setNewFollowUp(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Medication"
                                        id="add_medication"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newMedication,
                                            onChange: (e) => setNewMedication(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Body Temp"
                                        id="add_body_temp"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newBodyTemp,
                                            onChange: (e) => setNewBodyTemp(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Pulse Rate"
                                        id="add_pulse_rate"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newPulseRate,
                                            onChange: (e) => setNewPulseRate(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Respiration Rate"
                                        id="add_respiration_rate"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newRespirationRate,
                                            onChange: (e) => setNewRespirationRate(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Blood Pressure"
                                        id="add_blood_pressure"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newBloodPressure,
                                            onChange: (e) => setNewBloodPressure(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Weight"
                                        id="add_weight"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newWeight,
                                            onChange: (e) => setNewWeight(e.target.value),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Height"
                                        id="add_height"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: newHeight,
                                            onChange: (e) => setNewHeight(e.target.value),
                                        }}
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setEditModal(false)}>Cancel</Button>
                                <Button onClick={() => updateCons()} color="primary">Update</Button>
                            </DialogActions>
                        </Dialog>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}