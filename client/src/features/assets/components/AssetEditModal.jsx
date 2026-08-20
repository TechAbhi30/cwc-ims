import { useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { assetApi } from '../../../api/assetApi'
import Modal from '../../../components/ui/Modal'
import Button from '../../../components/ui/Button'
import { Spinner } from '../../../components/ui/Loader'
import AssetForm from './AssetForm'
import { useToast } from '../../../store/ToastContext'
import { invalidateAssetCaches } from '../assetCache'

/** Map an asset record to the shape AssetForm expects. */
const toFormValues = (detail) => ({
  category_id: String(detail?.category_id || ''),
  product_name: detail?.product_name || '',
  model: detail?.model || '',
  serial_number: detail?.serial_number || '',
  asset_number: detail?.asset_number || '',
  purchase_date: detail?.purchase_date?.split('T')[0] || '',
  warranty_expiry: detail?.warranty_expiry?.split('T')[0] || '',
  remarks: detail?.remarks || '',
  custom_fields: detail?.custom_fields || {},
})

/**
 * Shared "Edit Asset" modal.
 * Always (re)fetches the full asset before rendering the form so custom fields
 * are never submitted from a partial record and accidentally wiped.
 *
 * @param {string} assetId  UUID of the asset to edit
 * @param {function} onUpdated  optional callback after a successful save
 */
const AssetEditModal = ({ isOpen, onClose, assetId, onUpdated }) => {
  const queryClient = useQueryClient()
  const toast = useToast()

  const { data: detail, isLoading, isError } = useQuery({
    queryKey: ['asset', assetId],
    queryFn: () => assetApi.getById(assetId).then((r) => r.data.data),
    enabled: isOpen && !!assetId,
  })

  const updateMutation = useMutation({
    mutationFn: (data) => assetApi.update(assetId, data),
    onSuccess: () => {
      invalidateAssetCaches(queryClient)
      toast.success('Asset updated successfully')
      onUpdated?.()
      onClose()
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || 'Failed to update asset'),
  })

  // Memoised so AssetForm's `reset(defaultValues)` effect doesn't re-fire on
  // every parent render and discard what the user is typing.
  const formValues = useMemo(() => (detail ? toFormValues(detail) : null), [detail])

  if (!isOpen || !assetId) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Asset"
      size="lg"
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            form="asset-edit-form"
            type="submit"
            size="sm"
            loading={updateMutation.isPending}
            disabled={!detail}
          >
            Save Changes
          </Button>
        </>
      }
    >
      {isLoading || (!detail && !isError) ? (
        <div className="flex justify-center py-12"><Spinner /></div>
      ) : isError ? (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5">
          Could not load this asset. Please close and try again.
        </p>
      ) : (
        <AssetForm
          formId="asset-edit-form"
          isEdit
          defaultValues={formValues}
          onSubmit={(data) => updateMutation.mutate(data)}
        />
      )}
    </Modal>
  )
}

export default AssetEditModal
