"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWeddingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_wedding_dto_1 = require("./create-wedding.dto");
class UpdateWeddingDto extends (0, swagger_1.PartialType)(create_wedding_dto_1.CreateWeddingDto) {
}
exports.UpdateWeddingDto = UpdateWeddingDto;
//# sourceMappingURL=update-wedding.dto.js.map