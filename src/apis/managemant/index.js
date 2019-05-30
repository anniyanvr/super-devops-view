/**
 * 用户模块
 * @type {Object}
 */
export default [
  {
    name: '节点增加',
    method: 'envconfigsave',
    path: '/scm/appGroup/envconfig_save',
    type: 'json'
  },
  {
    name: '节点列表',
    method: 'groupenvlist',
    path: '/scm/appGroup/group_envlist',
    type: 'post'
  },
  {
    name: '查询节点',
    method: 'envlist',
    path: '/scm/appGroup/env_list',
    type: 'post'
  },
  {
    name: '删除应用组',
    method: 'delete',
    path: '/scm/appGroup/delete',
    type: 'post'
  },
  {
    name: '删除节点',
    method: 'deleteInstance',
    path: '/scm/appGroup/deleteInstance',
    type: 'post'
  },
  {
    name: '修改应用组',
    method: 'update',
    path: '/scm/appGroup/update',
    type: 'post'
  },
  {
    name: '添加节点',
    method: 'insertInstance',
    path: '/scm/appGroup/insertInstance',
    type: 'json'
  },
  {
    name: '修改节点',
    method: 'updateInstance',
    path: '/scm/appGroup/updateInstance',
    type: 'post'
  },
  {
    name: '获取分组名称',
    method: 'grouplist',
    path: '/scm/appGroup/group_list',
    type: 'post'
  },
  {
    name: '获取环境名称列表',
    method: 'envirlist',
    path: '/scm/appGroup/envir_list',
    type: 'post'
  }
]
