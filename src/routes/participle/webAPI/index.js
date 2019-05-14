/**
 * @description
 * @Version Created by stephen on 2019/5/13.
 * @Author stephen
 * @license dongfangdianzi
 */

import EnumAPI from './../../../constants/EnumAPI';
import T from './../../../utils/T';
const { postJSON, get } = T.request;


/**
 * 提交功能
 * @param params
 */
export const submitInfo = (params = {}) => postJSON(EnumAPI.submitInfo + '?mainWord=' + params.mainWord + '&stopWord=' + params.stopWord + '&code=' + params.code + '&person=' + params.person);

/**
 * 下一步功能
 */
export const refreshInfo = () => postJSON(EnumAPI.refreshInfo);