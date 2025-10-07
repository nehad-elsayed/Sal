// import { t } from "@lingui/core/macro";
// import { type ZodErrorMap, ZodIssueCode, type ZodParsedType } from "zod";

//   /**
//  * I18n zod error messages using lingui
//  * @see https://github.com/colinhacks/zod/blob/master/src/locales/en.ts
//  */
// export const customZodErrorMap: ZodErrorMap = (issue, _ctx) => {
//   let message: string;
//   switch (issue.code) {
//     case ZodIssueCode.invalid_type:
//       if (issue.received === ZodParsedType.undefined) {
//         message = t`Required field`;
//       } else {
//         if (
//           issue.expected === ZodParsedType.number &&
//           issue.received === ZodParsedType.string &&
//           _ctx.data === ""
//         ) {
//           message = t`Required field`;
//         } else {
//           message = t`Expected ${issue.expected}, received ${issue.received}`;
//         }
//       }
//       break;
//     case ZodIssueCode.invalid_union:
//       message = t`Invalid input`;
//       break;
//     case ZodIssueCode.too_small:
//       if ((issue.type === "array" || issue.type === "string") && issue.minimum === 1) {
//         message = t`Required field`;
//       } else message = t`String must contain at least ${issue.minimum as number} character(s)`;
//       break;
//     case ZodIssueCode.custom:
//       message = t`Invalid input`;
//       break;
//     case ZodIssueCode.invalid_string:
//       if (typeof issue.validation === "object") {
//         message = t`Invalid input`;
//       } else if (issue.validation !== "regex") {
//         message = t`Invalid ${issue.validation}`;
//       } else {
//         message = t`Invalid input`;
//       }
//       break;
//     default:
//       message = _ctx.defaultError ?? t`Invalid input`;
//   }
//   return { message };
// };
