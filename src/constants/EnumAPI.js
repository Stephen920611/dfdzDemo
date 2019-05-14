/**
 * @description
 * @Version Created by stephen on 2019/5/13.
 * @Author stephen
 * @license dongfangdianzi
 */

const _processAPI = (api) => {

    if (window.ENV.mock.isStart) {
        return '/mockAPI' + api;
    }
    return api;
};

/**
 *
 * @type {{login: *, logout: *, user_getAll: *, user_getPageList: *, user_getDetail: *, user_add: *, user_update: *, user_resetPassword: *, aToken_getPageList: *, aToken_getDetail: *, aToken_add: *, aToken_del: *, aToken_updateStatus: *, dSource_getAll: *, dSource_getPageList: *, dSource_getDetail: *, dSource_addSource: *, dSource_updateSource: *, dSource_delSource: *, dStore_getAll: *, dStore_getPageList: *, dStore_getDetail: *, dStore_addStore: *, dStore_updateStore: *, dStore_delStore: *, dModel_getPageList: *, dModel_getDetail: *, dModel_addModel: *, dModel_updateModel: *, dModel_delModel: *, dModel_query: *, dvComponentsCategories_getAll: *, dvComponentsCategories_getPageList: *, dvComponentsCategories_getDetail: *, dvComponentsCategories_addCategories: *, dvComponentsCategories_updateCategories: *, dvComponentsCategories_delCategories: *, dvComponents_getPageList: *, dvComponents_getDetail: *, dvComponents_addComponent: *, dvComponents_updateComponent: *, dvComponents_delComponent: *, dvComponents_dev_initDevSpace: *, dvComponents_dev_readDevFile: *, dvComponents_dev_saveDevFileContent: *, dvComponents_dev_addDevFileOrDir: *, dvComponents_dev_updateDevFileOrDir: *, dvComponents_dev_delDevFileOrDir: *, dvComponents_dev_npmDevComponent: *, dvComponents_dev_compileDevComponent: *, apexAppList: string, apexUploadAppPackage: string, apexDelAppPackage: function(*, *, *): string, apexDelApp: function(*, *, *, *): string, apexCreateApp: function(*, *, *, *): string, apexGetApp: function(*, *, *, *): string, apexGetYarnQueue: string, apexApplications: string, apexLaunchApplication: function(*, *, *, *): string, apexAppPackagesOperators: function(*, *, *): string, apexAppPackagesAttributes: function(*, *, *): string, apexAppJsonAssignableClasses: function(*, *, *, *): string, apexAppJsonClassesDetail: function(*, *, *, *): string, apexAppJsonValidate: function(*, *, *, *): string, apexAppJsonSave: function(*, *, *, *): string, apexClusterMetrics: string, apexAppInstanceRes: function(*): string, apexAppPhysicalPlanRes: function(*): string, apexAppPhysicalPlanOperatorsRes: function(*): string, apexAppPhysicalPlanOverview: function(*, *): string, apexAppPhysicalPlanContainerHistory: function(*, *): string, apexAppPhysicalPlanContainersRes: function(*): string, apexAppPhysicalPlanContainersOverview: function(*, *): string, apexAppPhysicalPlanContainerstackTrace: function(*, *): string, apexAppPhysicalPlanContainerLogRes: function(*, *): string, apexAppPhysicalPlanContainerLogDetail: function(*, *, *): string, apexAppPhysicalPlanContainerLogDownload: function(*, *, *): string, apexAppLogicalPlanRes: function(*): string, apexAppLogicalPlanOperatorsRes: function(*): string, apexAppLogicalPlanOperatorsProperties: function(*, *): string, apexAppAttemptsRes: function(*): string, apexAppAttemptsDetails: function(*, *): string, apexAppShutdown: function(*): string, apexAppKill: function(*): string, apexAppRestart: function(*): string, apexAppPhysicalOperatorProperties: function(*): string, apexAppStramEvents: function(*): string, apexMapping_getAll: *, apexMapping_getPageList: *, apexMapping_getDetail: *, apexMapping_add: *, apexMapping_update: *, apexMapping_del: *, kafkaM_clusters: string, kafkaM_topics: function(*): string, YarnM_clusters: string, YarnM_applications: string, YarnM_clustersMetrics: string, YarnM_clustersNodes: string, YarnM_clustersScheduler: string, YarnM_clustersApplicationsDetails: function(*): string, YarnM_clustersAttempt: function(*): string, HdfsM_NameNodeInfo: string, HdfsM_NameNodeStatus: string, HdfsM_snapshot: string, HdfsM_FSNamesystem: string, HdfsM_JvmMetrics: string, DruidM_Cluster: string, DruidM_OverloadRunningTasks: string, DruidM_OverloadPendingTasks: string, DruidM_OverloadWaitingTasks: string, DruidM_OverloadCompleteTasks: string, DruidM_OverloadWorkers: string, DruidM_OverloadSupervisor: string, DuridM_DataSourceIntervals: function(*): string, DuridM_DataSource: function(*): string, DuridM_Segments: function(*, *): string, DuridM_DataSourceId: string, DuridM_Rules: function(*): string, DuridM_RulesInfo: string}}
 */
const EnumAPI = {

    // submitInfo: (params) => _processAPI('/EsDictionary/submit?' + 'mainWord=' + params.mainWord + '&stopWord=' + params.stopWord + '&code=' + params.code + '&person=' + params.person),       // 提交
    submitInfo: _processAPI('/EsDictionary/submit'),       // 提交
    refreshInfo: _processAPI('/EsDictionary/getMessage'),         // 下一步刷新

};

export default EnumAPI;