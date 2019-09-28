"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
let AppService = class AppService {
    getToken(id) {
        const METABASE_SECRET_KEY = '516b794bfd85e5aebfe3de3e7708ea7bcc1064f3a953a06fd444065ed263cd77';
        const payload = {
            resource: { question: id },
            params: { tenant: 'digi_digi' },
            exp: Math.round(Date.now() / 1000) + (10 * 60)
        };
        return jsonwebtoken_1.sign(payload, METABASE_SECRET_KEY);
    }
};
AppService = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map