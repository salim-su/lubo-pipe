import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StartupService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { DA_SERVICE_TOKEN, ITokenService, SocialService } from '@delon/auth';
import { _HttpClient, SettingsService } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import MD5 from 'md5';

@Component({
    selector: 'passport-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
    showCaptcha = false;
    captchaUrl = '';
    captchaKey = '';

    constructor(
        fb: FormBuilder,
        modalSrv: NzModalService,
        private router: Router,
        private settingsService: SettingsService,
        private socialService: SocialService,
        @Optional()
        @Inject(ReuseTabService)
        private reuseTabService: ReuseTabService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private startupSrv: StartupService,
        public http: _HttpClient,
        public msg: NzMessageService,
        private htt: HttpClient,
    ) {
        this.form = fb.group({
            userName: [null, [Validators.required, Validators.minLength(4)]],
            password: [null, Validators.required],
            mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
            captcha: [null, [Validators.required]],
            remember: [true],
            captchaVerCode: [null, Validators.required],
        });
        modalSrv.closeAll();
    }

    // #region fields
    get captchaVerCode() {
        return this.form.controls.captchaVerCode;
    }

    get userName() {
        return this.form.controls.userName;
    }

    get password() {
        return this.form.controls.password;
    }

    get mobile() {
        return this.form.controls.mobile;
    }

    get captcha() {
        return this.form.controls.captcha;
    }

    form: FormGroup;
    error = '';
    type = 0;

    // #region get captcha

    count = 0;
    interval$: any;

    // #endregion

    switch(ret: any) {
        this.type = ret.index;
    }

    getCaptcha() {
        if (this.mobile.invalid) {
            this.mobile.markAsDirty({ onlySelf: true });
            this.mobile.updateValueAndValidity({ onlySelf: true });
            return;
        }
        this.count = 59;
        this.interval$ = setInterval(() => {
            this.count -= 1;
            if (this.count <= 0) {
                clearInterval(this.interval$);
            }
        }, 1000);
    }

    // #endregion

    submit() {
        this.error = '';
        if (this.type === 0) {
            this.captchaVerCode.markAsDirty();
            this.captchaVerCode.updateValueAndValidity();
            this.password.markAsDirty();
            this.password.updateValueAndValidity();
            this.userName.markAsDirty();
            this.userName.updateValueAndValidity();
            if (this.userName.invalid || this.password.invalid) {
                return;
            }
        } else {
            this.mobile.markAsDirty();
            this.mobile.updateValueAndValidity();
            this.captcha.markAsDirty();
            this.captcha.updateValueAndValidity();
            if (this.mobile.invalid || this.captcha.invalid) {
                return;
            }
        }

        // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
        // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
        this.http
            .post(
                'blade-auth/oauth/token?_allow_anonymous=true',
                {},
                {
                    grant_type: 'password',
                    username: this.userName.value,
                    password: MD5(this.password.value),
                    // password: this.password.value,
                    captchaKey: this.captchaKey,
                    captchaVerCode: this.form.value.captchaVerCode ? this.form.value.captchaVerCode.toLowerCase() : '',
                    tenantId: '000000',
                },
                {
                    headers: {
                        Authorization: 'Basic c3dvcmQ6c3dvcmRfc2VjcmV0',
                        'Tenant-Id': '000000',
                    },
                },
            )
            .subscribe((res: any) => {
                console.log(res);
                if (res.hasOwnProperty('captcha')) {
                    this.captchaUrl = res.captcha.image;
                    this.captchaKey = res.captcha.key;
                    this.showCaptcha = res.is_captcha;
                }

                if (res.hasOwnProperty('error_code')) {
                    this.msg.error(res.error_description);
                    return;
                }
                this.reuseTabService.clear();
                // 设置用户Token信息
                const user = {
                    token: res.access_token,
                    name: res.nick_name,
                    id: res.account,
                    time: +new Date(),
                };

                this.tokenService.set(user);
                // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
                this.startupSrv.load().then(() => {
                    let url = this.tokenService.referrer!.url || '/';
                    if (url.includes('/passport')) {
                        url = '/';
                    }
                    this.router.navigateByUrl(url);
                });
            });
    }

    ngOnDestroy(): void {
        if (this.interval$) {
            clearInterval(this.interval$);
        }
    }

    cl() {
        this.http.get('qx/blade-auth/oauth/captcha?_allow_anonymous=true').subscribe((res) => {
            this.captchaUrl = res.image;
            this.captchaKey = res.key;
        });
    }
}
