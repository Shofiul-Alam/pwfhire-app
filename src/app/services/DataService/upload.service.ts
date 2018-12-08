import {Injectable} from '@angular/core';
import {Response, Headers} from '@angular/http';
import {HttpClient} from '@angular/common/http';

declare const $: any;

@Injectable()
export class UploadService {

    public baseUrl = 'http://pwfhire.pb';
    public identity;
    public token;
    private remove = false;

    constructor() {
        this.token = JSON.parse(localStorage.getItem('token'));

    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>, bar?: any) {
        return new Promise((resolve, reject) => {
            const formData: any = new FormData();
            const xhr = new XMLHttpRequest();
            const apiEndPoint = this.baseUrl + url;

            const name_file_input = params[0];
            for (let i = 0; i < files.length; i++) {
            // console.log(name_file_input, files[i], files[i].name);
                formData.append(name_file_input, files[i], files[i].name);
            }

            formData.append('authorisation', this.token);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }

                }
            };

            if (bar !== undefined) {
                document.getElementById('upload-progress-bar-' + bar).setAttribute('value', '0');
                document.getElementById('upload-progress-bar-' + bar).style.width = '0%';

                xhr.upload.addEventListener('progress', function (event: any) {
                    const percent = (event.loaded / event.total) * 100;
                    const prc = Math.round(percent).toString();

                    document.getElementById('upload-progress-bar-' + bar).setAttribute('value', prc);
                    document.getElementById('upload-progress-bar-' + bar).style.width = prc + '%';
                    document.getElementById('status').innerHTML = Math.round(percent) + ' % subido... por favor espera a que termine';
                }, false);

                xhr.addEventListener('load', function () {
                    document.getElementById('status').innerHTML = 'Subida completada';
                    const prc = '100';
                    document.getElementById('upload-progress-bar-' + bar).setAttribute('value', prc);
                    document.getElementById('upload-progress-bar-' + bar).setAttribute('aria-valuenow', prc);
                    document.getElementById('upload-progress-bar-' + bar).style.width = prc + '%';
                }, false);

                xhr.addEventListener('error', function () {
                    document.getElementById('status').innerHTML = 'Error en la subida';
                }, false);

                xhr.addEventListener('abort', function () {
                    document.getElementById('status').innerHTML = 'Subida abortada';
                }, false);
            }

            xhr.open('POST', apiEndPoint, true);
            xhr.send(formData);
        });
    }

    avatarUpload() {
// Basic
        $('.dropify').dropify();

// Translated
        $('.dropify-fr').dropify({
            messages: {
                default: 'Drag and drop a file here or click',
                replace: 'Drag and drop or click to replace',
                remove: 'Remove',
                error: 'Ooops, something wrong happended.'
            }
        });
    }


}
