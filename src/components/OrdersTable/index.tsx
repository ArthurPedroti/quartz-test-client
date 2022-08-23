import { ColumnDef } from '@tanstack/react-table'
import Table from 'components/Table'
import {
  Badge,
  Tooltip,
  Icon,
  Container,
  IconButton,
  Flex,
  Text
} from '@chakra-ui/react'
import {
  FiSend,
  FiClock,
  FiCheckCircle,
  FiAlertTriangle,
  FiAlertOctagon,
  FiEdit
} from 'react-icons/fi'

import EditForm, { EditFormData } from './Edit'
import { useState } from 'react'

export type Order = {
  number: string
  provider: string
  tags: string
  month: number
  observation: string
  delivery: string
  status: string
  buyer: string
  approved: string
}

export type OrdersTableProps = {
  orders: Omit<Order, 'month'>[]
  handleEdit: (data: EditFormData, protheus_code: string) => void
}
type IconStatusPorps = {
  status: string
}
type BadgAprrovedProps = {
  approved: string
}

const BadgeApproved = ({ approved }: BadgAprrovedProps) => {
  if (approved === 'Sim')
    return (
      <Badge variant="subtle" colorScheme="green">
        {approved}
      </Badge>
    )
  else
    return (
      <Badge variant="subtle" colorScheme="red">
        {approved}
      </Badge>
    )
}

const IconStatus = ({ status }: IconStatusPorps) => {
  switch (status) {
    case 'Aguardando envio ao fornecedor':
      return (
        <Tooltip hasArrow label="Aguardando envio ao fornecedor">
          <span>
            <Icon as={FiSend} color="orange.400" />
          </span>
        </Tooltip>
      )
    case 'Aguardando confirmação':
      return (
        <Tooltip hasArrow label="Aguardando confirmação">
          <span>
            <Icon as={FiClock} color="cyan.400" />
          </span>
        </Tooltip>
      )
    case 'Confirmado':
      return (
        <Tooltip hasArrow label="Confirmado">
          <span>
            <Icon as={FiCheckCircle} color="green.400" />
          </span>
        </Tooltip>
      )
    case 'Atrasado':
      return (
        <Tooltip hasArrow label="Atrasado">
          <span>
            <Icon as={FiAlertOctagon} color="red.500" />
          </span>
        </Tooltip>
      )
    default:
      return (
        <Tooltip hasArrow label="Aguardando aprovação">
          <span>
            <Icon as={FiAlertTriangle} color="yellow.300" />
          </span>
        </Tooltip>
      )
  }
}
function OrdersTable({ orders, handleEdit }: OrdersTableProps) {
  const ordersFormatted = orders.map((orders) => ({
    ...orders,
    month: new Date(orders.delivery).getMonth() + 1,
    approved: orders.approved === 'yes' ? 'Sim' : 'Não'
  }))

  const [showEditModal, setShowEditModal] = useState(false)
  const [rowData, setRowData] = useState<Order>({} as Order)

  async function handleOpenEdit(row: Order | undefined) {
    if (row) {
      setRowData(row), setShowEditModal(true)
    }
  }
  async function handleCloseEdit() {
    setShowEditModal(false)
  }

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'status',
      cell: (info) => (
        <Container centerContent>
          <IconStatus status={info.getValue()} />
        </Container>
      ),
      aggregationFn: 'uniqueCount',
      aggregatedCell: (info) => `${info.getValue()} Status`,
      footer: (props) => props.column.id
    },
    {
      accessorKey: 'number',
      header: 'Núm',
      aggregationFn: 'uniqueCount',
      aggregatedCell: (info) => `${info.getValue()} Número`,
      footer: (props) => props.column.id,
      cell: (info) => <Container centerContent>{info.getValue()}</Container>
    },
    {
      accessorKey: 'approved',
      header: 'Apr',
      aggregationFn: 'uniqueCount',
      aggregatedCell: (info) => `${info.getValue()} Aprovado`,
      footer: (props) => props.column.id,
      cell: (info) => (
        <Container centerContent>
          <BadgeApproved approved={info.getValue()} />
        </Container>
      )
    },
    {
      accessorKey: 'buyer',
      header: 'Comprador',
      aggregationFn: 'uniqueCount',
      aggregatedCell: (info) => `${info.getValue()} Comprador`,
      footer: (props) => props.column.id
    },
    {
      accessorKey: 'provider',
      header: 'Fornecedor',
      aggregationFn: 'uniqueCount',
      aggregatedCell: (info) => `${info.getValue()} Fornecedor`,
      footer: (props) => props.column.id
    },
    {
      accessorKey: 'tags',
      cell: ({ getValue }: { getValue: () => string }) => (
        <Flex flexWrap="wrap" gap={2}>
          {getValue()
            .split(';')
            .map((info, index) => (
              <Badge colorScheme="green" key={index}>{`${info}`}</Badge>
            ))}
        </Flex>
      ),
      header: 'Tags',
      aggregationFn: 'uniqueCount',
      aggregatedCell: (info) => `${info.getValue()} Tags`,
      footer: (props) => props.column.id
    },
    {
      accessorKey: 'month',
      filterFn: 'weakEquals',
      cell: (info) => (
        <Container centerContent>
          {new Date(new Date().getFullYear(), Number(info.getValue()) - 1)
            .toLocaleDateString('pt-BR', {
              month: 'short'
            })
            .toUpperCase()}
        </Container>
      ),
      header: 'Mês',
      aggregationFn: 'uniqueCount',
      aggregatedCell: (info) => `${info.getValue()} Mês`,
      footer: (props) => props.column.id
    },
    {
      accessorKey: 'observation',
      header: 'Observação',
      aggregationFn: 'uniqueCount',
      aggregatedCell: (info) => `${info.getValue()} Observação`,
      footer: (props) => props.column.id,
      cell: (info) => (
        <Tooltip hasArrow label={info.getValue()}>
          <Text size="xs" noOfLines={2}>
            {info.getValue()}
          </Text>
        </Tooltip>
      )
    },
    {
      accessorKey: 'delivery',
      cell: (info) =>
        new Date(info.getValue().slice(0, -1)).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
      header: 'Entrega',
      aggregationFn: 'uniqueCount',
      aggregatedCell: (info) => `${info.getValue()} Entrega`,
      footer: (props) => props.column.id
    },
    {
      header: 'Ações',
      cell: (info) => (
        <Container centerContent>
          <IconButton
            variant="link"
            aria-label="Modal edit"
            onClick={() => handleOpenEdit(info.row.original)}
            icon={<Icon as={FiEdit} color="yellow.400" />}
          />
        </Container>
      )
    }
  ]

  return (
    <>
      <EditForm
        isOpen={showEditModal}
        handleClose={handleCloseEdit}
        formDefaultValues={rowData}
        handleEdit={handleEdit}
      />
      <Table data={ordersFormatted} columns={columns} />
    </>
  )
}

export default OrdersTable
