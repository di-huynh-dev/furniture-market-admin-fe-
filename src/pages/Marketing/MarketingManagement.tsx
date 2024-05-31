import { query_keys } from '@/constants/query-keys'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { MarketingType } from '@/types/marketing.type'
import { useQuery } from '@tanstack/react-query'
import DataTable, { TableColumn } from 'react-data-table-component'

const MarketingManagement = () => {
  const axiosPrivate = useAxiosPrivate()

  const { data, isLoading } = useQuery({
    queryKey: [query_keys.MARKETING],
    queryFn: async () => {
      const resp = await axiosPrivate.get('/admin/marketing-product?currentPage=0&pageSize=1000')
      return resp.data.data.content
    },
  })

  const columns: TableColumn<MarketingType>[] = [
    { name: 'ID', cell: (row) => row.id },
    {
      name: 'Danh sách sản phẩm',
      cell: (row) => (
        <>
          {row.productIds.map((item) => (
            <p>{item}</p>
          ))}
        </>
      ),
    },
    { name: 'Ngày bắt đầu', cell: (row) => row.startDate },
    { name: 'Ngày kết thuật', cell: (row) => row.endDate },
    {
      name: 'Từ khóa',
      cell: (row) => (
        <div>
          {row.keywords.map((item) => (
            <p>{item}</p>
          ))}
        </div>
      ),
    },
  ]
  return (
    <div>
      <div className="card shadow-lg my-2 bg-white">
        <div className="card-body">
          <DataTable
            title="Danh sản phẩm đăng ký Marketing"
            columns={columns}
            progressPending={isLoading}
            data={data}
            pagination
          />
        </div>
      </div>
    </div>
  )
}

export default MarketingManagement