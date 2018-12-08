import {Injectable} from '@angular/core';
import {CustomDate} from '../../models/CustomDate';
import {CustomTime} from '../../models/CustomTime';
import {SMS} from '../../models/Sms';
import * as $ from 'jquery';
import {AppService} from '../base/app.service';
import {Response} from '../../models/ServiceModel/Response';
import {ErrorResponse} from '../../models/ServiceModel/ErrorResponse';

@Injectable()
export class ValidationService {

    constructor(
        private _appService: AppService,
    ) {}
    isReallyNumber(data) {
        if (isNaN(data)) { return true; } else {return false; }
    }
    checkPassword(x, y) {
        if (x !== y) {return true; } else {return false; }
    }

    createNgDate(string: any) {
        if (string.date) {
            return string;
        } else {
            const dateArr = string.split('/');
            return new CustomDate( parseInt(dateArr[2], 0), parseInt(dateArr[1], 0), parseInt(dateArr[0], 0), string);
        }

    }

    checkDateForOrder(start, end) {
        const a = start.year + '-' + start.month + '-' + start.day;
        const firstDate = new Date(a).getTime();
        const b = end.year + '-' + end.month + '-' + end.day;
        const lastDate = new Date(b).getTime();
        if (firstDate < lastDate) { return false; }
        return true;
    }

    isValidDate(dateString) {
        if (dateString.year !== 0 && dateString.month !== 0 && dateString.day !== 0) {

            const regEx = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateString.match(regEx)) {
                return true;
            }  // Invalid format
            return false;
        } else {return; }
    }

    currentDate(): CustomDate {
            const a = new Date();
            const year = a.getFullYear();
            const month = a.getMonth() + 1;
            const day = a.getDate();
            const date = new CustomDate(year, month, day);
            return date;
    }

    convertDate(UNIX_timestamp) {
            const a = new Date(UNIX_timestamp * 1000);
            const year = a.getFullYear();
            const month = a.getMonth() + 1;
            const day = a.getDate();
            const date = new CustomDate(year, month, day);
            return date;
    }
    convertTime(UNIX_timestamp) {
        const a = new Date(UNIX_timestamp.timestamp * 1000);
        const hour = a.getHours();
        const minute = a.getMinutes();
        const second = a.getSeconds();
        const time = new CustomTime(hour, minute, second);
        return time;
    }
    convertToCustomDate(data) {
        const date = new CustomDate();
        if (data !== null && typeof data !== 'undefined') {
            if (data.hasOwnProperty('timestamp')) {
                const dobObj = this.dateConversion(data);
                return dobObj.month + '/' + dobObj.day + '/' + dobObj.year ;
            } return data.month + '/' + data.day + '/' + data.year ;
        } return  date.month + '/' + date.day + '/' + date.year ;
    }
    convertToCustomTime(data) {
        const date = new CustomTime();
        if (data !== null) {
            if (data.hasOwnProperty('timestamp')) {
                return this.convertTime(data);
            } return data;
        } return  date;
    }
    dateShow(d) {
        // let newDate = new CustomDate();
        // if(d != null){
        //     if(d.hasOwnProperty('timestamp')){
        //         newDate = this.dateConversion(d);
        //         let date = ((newDate.day.toLocaleString()).length==1? ('0'+newDate.day):newDate.day) +'-'
        //             + ((newDate.month.toLocaleString()).length==1? ('0'+newDate.month):newDate.month)+'-'+newDate.year;
        //         return date;
        //     }else {
        //         let data = new CustomDate(d.year,d.month,d.day);
        //         let date = ((data.day.toLocaleString()).length==1? ('0'+data.day):data.day) +'-'
        //         + ((data.month.toLocaleString()).length==1? ('0'+data.month):data.month)+'-'+data.year;
        //         return date;
        //     }
        // }
        return d;
    }

    timeShow(data) {
        let time = new CustomTime();
        if (data !== null) {
            if (data.hasOwnProperty('timestamp')) {
                time = this.convertTime(data);
                const date = ((time.hour.toLocaleString()).length === 1 ? ('0' + time.hour) : time.hour) + ':'
                    + ((time.minute.toLocaleString()).length === 1 ? ('0' + time.minute) : time.minute) + ':'
                    + ((time.seconds.toLocaleString()).length === 1 ? ('0' + time.seconds) : time.seconds);
                return date;
            } else {
                  data = this.timeconvertion(data);
                  const date = ((data['hour'].toLocaleString()).length === 1 ? ('0' + data['hour']) : data['hour']) + ':'
                  + ((data['minute'].toLocaleString()).length === 1 ? ('0' + data['minute']) : data['minute']) + ':'
                  + ((data['seconds'].toLocaleString()).length === 1 ? ('0' + data['seconds']) : data['seconds']);
                  return date;
            }
        }
        return '';
    }

    timeconvertion(data) {
      const a = new Date(1970, 0, 1, data['hour'], data['minute']);
      const hour = a.getHours();
        const minute = a.getMinutes();
        const second = a.getSeconds();
        const time = new CustomTime(hour, minute, second);
        return time;
    }

    dateConversion(data) {
        const a = new Date(data.timestamp * 1000);
        const year = a.getFullYear();
        const month = a.getMonth() + 1;
        const day = a.getDate();
        const date = new CustomDate(year, month, day);
        return date;
    }

    getDates( d1, d2 ): Array<CustomDate> {
        const d: Array<CustomDate> = [];
        let ms = d1.timestamp * 1000;
        const last = d2.timestamp * 1000;
        for (ms; ms <= last; ms += 86400000) {
          const a = new Date(ms), year = a.getFullYear(), month = a.getMonth() + 1, day = a.getDate();
          const date = new CustomDate(year, month, day);
          d.push(date);
        }
        return d;
    }

    getWeekDay(date) {
        const a = date.year + '-' + date.month + '-' + date.day;
        const d = new Date(a);
        const weekday = new Array(7);
        weekday[0] =  'Sunday';
        weekday[1] = 'Monday';
        weekday[2] = 'Tuesday';
        weekday[3] = 'Wednesday';
        weekday[4] = 'Thursday';
        weekday[5] = 'Friday';
        weekday[6] = 'Saturday';

        return weekday[d.getDay()];
    }

    picIcon(data) {
        return data.substr( data.lastIndexOf('.') + 1 );
    }
    docName(data) {
        return data.substring(0, data.lastIndexOf('.') );
    }

    checkPdf(a) {
        let x;
        if (a) {
            if (a.indexOf('/') === -1) {x = this.picIcon(a); } else {
                const n = a.indexOf('/');
                x = this.picIcon(a.slice(n + 1));
            }
            if (x === 'pdf') {return 1; }
            return 0;
        }
    }

    hasExpiryData(data) {
        if (data.timestamp != null || data.timestamp !== '') {return false; }
        return true;
    }

    floatLabel() {
        this.label();
        $('.floating-labels .form-control').on('focus blur', function(e) {
            $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
        }).trigger('blur');

    }

    private label() {
        $('.form-group label').on('click', event => {
          const clickedElement = $(event.target);
          clickedElement.parents('.form-group').addClass('focused');
          clickedElement.parents('.form-group').find('.form-control').focus();
        });
     }

     errorStatus(error, extra) {
        extra.loader = false;
        extra.code = error.status;
        extra.status = error.statusText;
        setTimeout(() => {extra.code = 0; }, 3000);
      }

    successRes(response, f, extra) {
      extra.loader = false;
      extra.status = response.msg;
      setTimeout(() => {
        extra.code = 0;
        f.form.reset();
      }, 2000);
    }

    getResponce(response, extra) {
      extra.status = response.msg;
      extra.loader = false;
      setTimeout(() => {
        extra.code = 0;
      }, 2000);
    }

    colorContact(i) {
        return {'btn-primary': i === 0 || i === 5 || i === 10 || i === 15 || i === 20 || i === 25,
                'btn-warning': i === 1 || i === 6 || i === 11 || i === 16 || i === 21 || i === 26,
                'btn-inverse': i === 2 || i === 7 || i === 12 || i === 17 || i === 22 || i === 27,
                'btn-info': i === 3 || i === 8 || i === 13 || i === 18 || i === 23 || i === 28,
                'btn-danger': i === 4 || i === 9 || i === 14 || i === 19 || i === 24 || i === 29,
                'btn-default': i > 30
            };
    }

    openModalScroll(add, addContact) {
        $(add).addClass('openModal');
        $(addContact).removeClass('openModal');
    }
    contactModalScroll(add) {
       $(add).addClass('openModal');
    }

    validContactbutton() {
        if (!sessionStorage.getItem('conAddress')) {return true; }
        return false;
    }

    validAddbutton() {
        if (!sessionStorage.getItem('address')) {return true; }
        return false;
    }

    checkRattingRang(num) {
        if (!isNaN(num)) {
            const x = parseInt(num, 10);
            if (x > 0 && x < 6) {return false; }
            return true;
        } return false;
    }

    removeDot(id) {
       if (id != null) {return id.replace(/\./g, ''); }
    }

    getSMSIndex(sms, id) {
        for (let s = 0; s < sms.length; s++) {
            if (sms[s].empId === id) {return s; }
        }
    }

    showSMS(task) {
        return `Hi *****, you have a work from '${task.order.project.client.companyName}' at '${task.order.project.projectAddress}',
        to perform '${task.taskName}', during the following dates
        [Date, Starting time, Ending Time]`;
    }

    createSMSObject(employee, allocatedDates, smsline, task) {
        const sms = new SMS();
        sms.line = smsline.line;
        sms.empId = employee.id;
        sms.empName = employee.user.firstName + ' ' + employee.user.lastName;
        const d = this.smsDates(allocatedDates, task);
        sms.dates.push(d);
        return sms;
      }

      smsDates(allocatedDates, task) {
        let smsDates = '';
        if (allocatedDates.id === 0) {
          smsDates = this.dateShow(allocatedDates.date) + '(' + allocatedDates.day +  ') from ' +
                this.timeShow(task.startTime) + ' to ' +
                this.timeShow(task.endTime);
        }
        return smsDates;
      }

      checkSMSDate(date) {
          const a = date.indexOf('(');
          const b = (date.slice(0, a)).trim();
          const d = b.split('-');
          return d[2] + '-' + d[1] + '-' + d[0];
      }

      makeSMS(sms) {
        let dates = '';
        const filterDate = sms.dates.filter((n) => {
            if (n !== '') {return true; }
        });
        // console.log(filterDate)
        const smsDates = this.sortingSMSDates(filterDate);
        // console.log(smsDates)
        for (const s of smsDates) {
          dates += s + '\n';
        }
        return 'Hi ' + sms.empName + ', ' + sms.line + '\n' + dates;
      }

      sortingSMSDates(dates) {
          dates.sort((a, b) => {
              const dateA = this.checkSMSDate(a), dateB = this.checkSMSDate(b);
              // console.log(dateA,dateB)
              const fDate = new Date(dateA).getTime();
              const lDate = new Date(dateB).getTime();
              if (fDate < lDate) { return -1; }
              if (fDate > lDate) { return 1; }
              return 0;
          });
          return dates;
      }

     checkExpiryDate(d) {
        const now = new Date().getTime();
        let date;
        if (d.hasOwnProperty('timestamp')) {date = d.timestamp * 1000 ;
            } else {date = this.toTimestamp(d) * 1000; }

        const beforeExpiry = now + (3 * 86400000);

        if (date < now) {
            return 'expired';
        } else if (date >= now && date <= beforeExpiry) {
            return 'expiring';
        }
        return null;
     }

     expiringDocList(arr, expired: boolean) {
         const list = [];
         for (const data of arr) {
             if (data.hasOwnProperty('skillId')) {
                 const ch = this.checkExpiryDate(data.expiryDate);
                 if (expired && ch === 'expired') {
                     list.push(data);
                 } else if (!expired && ch === 'expiring') {
                     list.push(data);
                 }
             }
         }
         return list;
     }

     toTimestamp(date) {
        if (date != null) {
            const a = date.year + '-' + date.month + '-' + date.day;
            const datum = Date.parse(a);
            return datum / 1000;
        } return null;
    }

    convertHourMin(data) {
      const time = new CustomTime();
      if (data && data !== '') {
          if (data.includes('hour')) {
            const a = data.indexOf('hours');
            const b = data.indexOf('mins');
            time.hour = data.slice(0, a).trim();
            time.minute = data.slice(a + 5, b).trim();
          } else {
            time.hour = data;
          }
      }
      return time;
    }

    convertToHour(data) {
      const time = data.hour + (data.hour > 2 ? ' hours' : ' hour') + ' ' + data.minute + (data.minute > 2 ? ' mins' : ' min' );
       return time;
    }

   formatTime(a) {
      const time = this.convertToCustomTime(a);
      const t = '1970-01-01 ' + time.hour + ':' + time.minute;
      return new Date(t);
    }

    getTimeDifferenc(a, b) {
      const time = new CustomTime();
      const t1 = this.formatTime(a), t2 = this.formatTime(b);
      const diff = (t2.getTime() - t1.getTime()) / 60000;
      const d = Math.abs(diff) / 60;
      time.hour = parseInt(d.toString().split('.')[0], 10);
      time.minute = Math.abs(diff) % 60;
      return time;
    }

    getDays(date: string) {
        const creatDate = new Date(date).getTime();
        const now = new Date().getTime();
        const diff = (now - creatDate) / 86400000;
        return Math.round(diff);
    }

    checkWeekend(d) {
      const arr = ['SATURDAY', 'SUNDAY'];
      const day = d.trim().toUpperCase();
      if (arr.includes(day)) {return d; }
      return 'No';
    }

    checkWeekday(d) {
      const arr = ['SATURDAY', 'SUNDAY'];
      const day = d.trim().toUpperCase();
      if (arr.includes(day)) {return 'No'; }
      return d;
    }

    checkday(d, b) {
      if (d) {
        const a = this.convertToCustomDate(d);
        const getDay = this.getWeekDay(a);
        if (b) {return this.checkWeekday(getDay); }
        return this.checkWeekend(getDay);
      }
    }


    getDefferenc(a, b) {
      const t1 = this.formatTime(a), t2 = this.formatTime(b);
      const diff = (t2.getTime() - t1.getTime()) / 60000;
      return Math.abs(diff) / 60;
    }

    checkOverTime(time) {
      if (time && time.hour > 18) {
        const h = time.hour - 18;
        const m = time.minute ? time.minute : 0;
        return h + (h < 2 ? ' hour ' : ' hours ') + m + ( m < 2 ? ' min ' : '  mins ');
      }
      return 'No overtime';
    }

    getDateRange( d1, d2 ): Array<CustomDate> {
        const d: Array<CustomDate> = [];
        let ms = new Date(d1).getTime();
        const last = new Date(d2).getTime();
        for (ms; ms <= last; ms += 86400000) {
          const a = new Date(ms), year = a.getFullYear(), month = a.getMonth() + 1, day = a.getDate();
          const date = new CustomDate(year, month, day);
          d.push(date);
        }
        return d;
    }

    getShift(s) {
      const time = this.convertToCustomTime(s);
      if (time.hour < 18) {return 'Day'; }
      return 'Night';
    }

    getOvertime(t) {
      const time = this.convertToCustomTime(t);
      if (time.hour > 18) {
        const h = time.hour - 18;
        const m = time.minute;
        return h + (m / 60);
      }
      return 0;
    }

    howManyDays(user) {
      if (user.createdAt) {
          const a = this.dateShow(user.createdAt);
          const creatDate = new Date(a).getTime();
          const now = new Date().getTime();
          const diff = (now - creatDate) / 86400000;
          return Math.round(diff);
      }
      return 0;
    }
    getCountriesList() {
        return this._appService.getAssets<Response>('/assets/api/countries.json');
    }

    getCountryFromSelect(arr, f) {
        for (const i of arr) {
            if (i.id === f) {
                return i.text;
            }
        }
        return;
    }

    checkCountry(data, con) {
        if (con) {
            for (const i of data) {
                if (i.text === con) {
                    return i.id;
                }
            }
        }
        return '';
    }

    errorHandler(error: any) {
        if (error) {
            const commonElem = document.getElementById('errorPlace');
            if (commonElem != null) {
                commonElem.innerHTML = '';
            }
            for (const errItem in error.error.error) {
                if (error.error.error.hasOwnProperty(errItem)) {
                    for (const err of error.error.error[errItem]) {
                        const elem = document.getElementById(errItem);
                        if (elem) {
                            elem.innerHTML = err;
                        } else {
                            commonElem.innerHTML += err;
                        }
                    }
                }
            }
        }
    }


}
