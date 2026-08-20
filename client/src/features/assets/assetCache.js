/**
 * Every cache key that can surface asset fields (product name, model, serial,
 * asset number, dates, custom fields). Invalidated together after an edit so a
 * change made from one screen is reflected everywhere else — asset list, asset
 * detail, assignments, the employee equipment tab, reports and dashboard.
 */
const invalidateAssetCaches = (queryClient) => {
  const keys = [
    ['assets'],
    ['asset'],
    ['assets-available'],
    ['assignments-active'],
    ['assignments-history'],
    ['employee-assignments'],
    ['employee-history'],
    ['employees'],
    ['report-asset-status'],
    ['report-assignment-history'],
    ['report-damaged'],
    ['dashboard-stats'],
    ['dashboard-activity'],
    ['dashboard-maintenance-alerts'],
  ]
  keys.forEach((queryKey) => queryClient.invalidateQueries({ queryKey }))
}

export { invalidateAssetCaches }
