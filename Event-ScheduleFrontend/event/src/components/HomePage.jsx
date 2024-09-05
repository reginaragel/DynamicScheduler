import React from "react";
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import {L10n} from '@syncfusion/ej2-base';
import { registerLicense } from '@syncfusion/ej2-base';
import Header from "./Header";


registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF1cXGBCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXZedXRRRGRZVUV+Vks=');

L10n.load({
    'en-US':{
        'schedule':{
            'saveButton':'Add',
            'cancelButton':'Close',
            'deleteButton':'Remove',
            'newEvent':'Add Event',
        }
    }
})

const HomePage = () => {
    const localdata = [
        {
            Id: 1,
            Subject: 'John',
            StartTime: new Date(2024, 4, 7, 6, 0),
            EndTime: new Date(2024, 4, 7, 7, 0),
        },
        {
            Id: 2,
            Subject: 'James',
            StartTime: new Date(2024, 4, 8, 8, 0),
            EndTime: new Date(2024, 4, 8, 9, 0),
        },
    ];

    const onActionBegin=async(args)=>{
        if (args.requestType === 'eventCreate') {
            const task={
                Subject:args.data[0].Subject,
                StartTime:args.data[0].StartTime,
                EndTime:args.data[0].EndTime,
                Description:args.data[0].Description,
            } 
            try {
                const response = await fetch('http://localhost:5000/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(task),
                });
                const data = await response.json();
                if (response.ok) {
                    console.log('Task saved successfully',data);
                } else {
                    console.log('Failed to save task');
                }
            } catch (err) {
                console.error('Error while saving task:', err);
            }

    }
    }
    const editorWindowTemplate = (props) => {
        return (
            <table className="custom-event-editor">
                <tbody>
                    <tr>
                        <td className="e-textlabel">Summary</td>
                        <td><input id="Summary" name="Subject" type="text" style={{width:'100%'}}/></td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Status</td>
                        <td>
                            <DropDownListComponent id="EventType" dataSource={['New', 'Requested', 'Confirmed']}
                                placeholder="Choose Status" name="EventType" style={{width:'100%'}} value={props.EventType || null}>
                            </DropDownListComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">From</td>
                        <td>
                            <DateTimePickerComponent id="StartTime" name="StartTime"
                                value={new Date(props.StartTime)} style={{width:'100%'}}>
                            </DateTimePickerComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">To</td>
                        <td>
                            <DateTimePickerComponent id="EndTime" name="EndTime"
                                value={new Date(props.EndTime)} style={{width:'100%'}}>
                            </DateTimePickerComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Reason</td>
                        <td>
                            <textarea id="Description" name="Description"
                            rows={3} cols={5} style={{width:'100%',height:'60px !important',resize:'vertical'}}></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    };

    return (
        <div>
            <ScheduleComponent currentView="Month"
                selectedDate={new Date(2024, 9, 10)}
                height='550px'
                eventSettings={{ dataSource: localdata }}
                views={['Day', 'Week', 'Month', 'TimelineDay', 'TimelineWeek']}
                editorTemplate={editorWindowTemplate}
                actionBegin={onActionBegin}>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
        </div>
    );
};

export default HomePage
