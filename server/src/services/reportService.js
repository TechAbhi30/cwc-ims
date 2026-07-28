const reportRepository = require("../repositories/reportRepository");

/**
 * Report Service
 * Provides business-level access to report data
 */

const getEmployeeAssets = async () => reportRepository.getEmployeeAssets();

const getCategoryAssets = async () => reportRepository.getCategoryAssets();

const getAssetStatusReport = async (filters) =>
  reportRepository.getAssetStatusReport(filters);

const getAssetStatusFieldDefinitions = async (categoryIds) =>
  reportRepository.getAssetStatusFieldDefinitions(categoryIds);

const getAssignmentHistory = async (filters) =>
  reportRepository.getAssignmentHistory(filters);

const getConsumableStock = async () => reportRepository.getConsumableStock();

const getBulkInventoryTransactions = async (filters) =>
  reportRepository.getBulkInventoryTransactions(filters);

const getDamagedAssets = async () => reportRepository.getDamagedAssets();

module.exports = {
  getEmployeeAssets,
  getCategoryAssets,
  getAssetStatusReport,
  getAssetStatusFieldDefinitions,
  getAssignmentHistory,
  getConsumableStock,
  getBulkInventoryTransactions,
  getDamagedAssets,
};
