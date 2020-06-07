import React, { useEffect, useState } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment'
var date = new Date();

var mailData = [
    {
        id: 1,
        from: 'aaa@example.com',
        to: 'zzz.zzz@example.com',
        subject: '[HR-888] Notice of official announcement',
        date: new Date(date.getTime() - 20000 * 60),
        conversation: null,
        attachment: false
    },
    {
        id: 2,
        from: 'bbb.bbb@example.com',
        to: 'yyy@example.com',
        subject: '[web:333] "Web Contact"',
        date: new Date(date.getTime() - 10000 * 60),
        conversation: null,
        attachment: false
    },
    {
        id: 3,
        from: 'ccc@example.com',
        to: 'xxx@example.com, yyy@example.com',
        subject: 'Happy New Year! Greetings for the New Year. ',
        date: date,
        conversation: '1+',
        attachment: true
    },
    {
        id: 4,
        from: 'ddd.ddd@example.com',
        to: 'vvv.vvv@example.com, yyy@example.com',
        subject: '[HR-887(Revised: Office Expansion Project Team)] Notice of off Expansion',
        date: new Date(date.getFullYear(), 0, 1),
        conversation: '1+',
        attachment: false
    },
    {
        id: 5,
        from: 'ddd.ddd@example.com',
        to: 'eee@example.com, yyy@example.com',
        subject: '[Github] Logout page',
        date: new Date(date.getFullYear(), 0, 1),
        conversation: '2+',
        attachment: false
    },
    {
        id: 6,
        from: 'fff.fff@example.com',
        to: 'qqq.qqq@example.com',
        subject: '[dev］ Postfix 3.1.12 / 3.2.9 / 3.3.4 / 3.4.5',
        date: new Date(date.getFullYear(), 0, 1),
        conversation: null,
        attachment: false
    },
    {
        id: 7,
        from: 'ggg@example.com',
        to: 'ppp@example.com',
        subject: 'Re: [Github] Brush-up on loading animation',
        date: new Date(date.getFullYear(), 0, 1),
        conversation: null,
        attachment: false
    },
    {
        id: 8,
        from: 'hhh.hhh@example.com',
        to: 'ooo.ooo@example.com',
        subject: 'Workplace Summary for sample, Inc.: Jun 2 - Jun 9',
        date: new Date(date.getFullYear(), 0, 1),
        conversation: null,
        attachment: true
    },
    {
        id: 9,
        from: 'iii@example.com',
        to: 'nnn@example.com',
        subject: 'I love you',
        date: new Date(2019, 11, 31),
        conversation: null,
        attachment: true
    },
    {
        id: 910,
        from: 'Pablo-Diego-José-Francisc_hello@example.com',
        to: 'Pablo-Diego-José-Francisc_hello@example.com',
        subject: '[info:888] ABC EQUIPMENT COMPANY',
        date: new Date(2019, 11, 31),
        conversation: null,
        attachment: true
    }
]

const textLimit = (title, length) => {
    let dots = title.length > length;
    title = title.slice(0, length)

    if (dots) {
        return title + '...'
    } else {
        return title
    }
}




const momentFormat = (date) => {
    var mDate = moment(date).format('YYYY/MM/DD');
    var now = moment().format('YYYY/MM/DD');
    if (now > mDate) {
        var nm = moment().format('YYYY');
        var dm = moment(date).format('YYYY');
        if (nm === dm) {
            return moment(date).format('MMM DD');
        } else {
            return mDate
        }
    } else {
        var val = moment(date).fromNow();
        if (val == 'a few seconds ago') {
            return '0:00';
        } else {
            return '0:' + val.replace(' minutes ago', '')
        }
    }
}



const MailArchiveComponent = () => {

    const [startDate, setStartDate] = useState("01/01/2020")
    const [endDate, setEndDate] = useState("01/01/2020")
    const [filter, setFilter] = useState(false)
    var [jsonData, setJson] = useState(mailData)



    function handleSearch() {
        jsonData = jsonData.filter((item) => {
            return moment(item.date).format('MM/DD/YYYY') >= startDate &&
                moment(item.date).format('MM/DD/YYYY') <= endDate
        })

        setJson(jsonData);
    }


    function handleEvent(event, picker) {
        setStartDate(moment(picker.startDate._d).format('MM/DD/YYYY'));
        setEndDate(moment(picker.endDate._d).format('MM/DD/YYYY'));
    }



    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: 'white', borderRight: 'none' }}>
                                <img src="/img/icon_calender.svg" style={{ height: '20px', width: '20px' }} />
                            </span>
                        </div>
                        <DateRangePicker startDate={startDate} endDate={endDate} onEvent={handleEvent}>
                            <input type="text" className="form-control input-calender" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value={`${startDate} - ${endDate}`} />
                        </DateRangePicker>
                        <div className="input-group-prepend" style={{ borderLeft: 'none', cursor: 'pointer' }} onClick={handleSearch}>
                            <span className="input-group-text" id="basic-addon1">
                                <img src="/img/icon_search.svg" style={{ height: '20px', width: '20px' }} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col text-left">
                    <div className="h5 text-secondary">Results: {jsonData.length} mail (s)</div>
                    {jsonData.length > 0 ?
                        <div className="content-table">
                            <div className="table-responsive">
                                <div className="mail-table-head">
                                    <div className="mail-from-h">
                                        <div className="h6 text-secondary mr-1">From</div>
                                        <div className="carrot">
                                            <img className="" src="/img/icon_arrow01.svg" style={{ height: '15px', width: '12px' }} />
                                        </div>
                                    </div>
                                    <div className="mail-to-h">
                                        <div className="h6 text-secondary">To</div>
                                    </div>
                                    <div className="mail-subject-h">
                                        <div className="h6 text-secondary">Subject</div>
                                    </div>
                                    <div className="mail-date-h">
                                        <div className="h6 text-secondary">Date</div>
                                    </div>
                                </div>
                                {
                                    jsonData.map(data => (
                                        <div className="mail-table-body" key={data.id}>
                                            <div className="mail-from">
                                                <div>
                                                    {textLimit(data.from, 15)}
                                                </div>
                                                <div className="date-res">
                                                    {
                                                        momentFormat(data.date)
                                                    }
                                                </div>
                                            </div>
                                            <div className="mail-to pr-3">
                                                <div>{textLimit(data.to, 20)}</div>
                                                {data.conversation != null &&
                                                    <div className="pl-3 pr-3">
                                                        <span class="badge badge-secondary">{data.conversation}</span>
                                                    </div>
                                                }
                                            </div>
                                            <div className="mail-subject pr-3">
                                                <div>{textLimit(data.subject, 62)}</div>
                                                {data.attachment &&
                                                    <div><img className="icon-attach" src="/img/icon_clip.svg" style={{ height: '20px', width: '20px' }} /></div>
                                                }
                                            </div>
                                            <div className="mail-date">
                                                {
                                                    momentFormat(data.date)
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        :
                        <div className="empty">
                            <img src="/img/logo.png"></img>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default MailArchiveComponent