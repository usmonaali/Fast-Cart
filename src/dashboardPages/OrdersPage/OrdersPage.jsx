import React, { useEffect, useState } from "react";
import {
  getOrders,
  updateOrderStatus,
  ORDER_STATUS,
  PAYMENT_STATUS,
} from "../../api/orders";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  ClipboardList,
} from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const StatusBadge = ({ value, map }) => {
  const info = map[value] || {
    label: "—",
    color: "#6C737F",
    bg: "#F2F4F7",
  };

  return (
    <span
      className="text-[13px] font-[600] px-[10px] py-[3px] rounded-[4px] dark:bg-[#1F2937] dark:text-slate-400"
      style={{
        color: info.color,
        backgroundColor: info.bg,
      }}
    >
      {info.label}
    </span>
  );
};

const EmptyState = () => {
  const {t} = useTranslation()
  return (
    <>
      <div className="flex flex-col items-center justify-center py-[80px]">
        <div className="w-[64px] h-[64px] rounded-[12px] bg-[#EFF6FF] dark:bg-[#1F2937] flex items-center justify-center mb-[16px]">
          <ClipboardList className="w-[28px] h-[28px] text-[#2f6fed]" />
        </div>

        <h2 className="font-[600] text-[18px] text-[#111927] dark:text-white mb-[6px]">
          {t("orders.noOrders")}
        </h2>

        <p className="text-[14px] text-[#6C737F] dark:text-slate-400 text-center max-w-[320px] mb-[20px]">
          {t("orders.noOrdersDescription")}
        </p>

        <button className="flex items-center gap-2 bg-[#2f6fed] hover:bg-[#2560d6] text-white text-sm font-[600] px-4 py-2 rounded-lg">
          + {t("orders.addOrder")}
        </button>
      </div>
    </>
  );
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const pageSize = 10;

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editStatus, setEditStatus] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const loadOrders = () => {
    setIsLoading(true);

    getOrders({
      page,
      pageSize,
      search: search || undefined,
    })
      .then((data) => {
        setOrders(data.items);
        setTotalCount(data.totalCount);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, [page, search]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    setSelected((prev) =>
      prev.length === orders.length ? [] : orders.map((o) => o.id),
    );
  };

  const handleDeleteConfirm = () => {
    setOrders((prev) => prev.filter((o) => !selected.includes(o.id)));

    setTotalCount((prev) => Math.max(0, prev - selected.length));

    setSelected([]);
    setDeleteOpen(false);
  };

  const openEditModal = () => {
    const firstOrder = orders.find((o) => o.id === selected[0]);

    setEditStatus(firstOrder?.status || 1);
    setEditOpen(true);
  };

  const handleEditSave = async () => {
    setIsSaving(true);

    try {
      await Promise.all(
        selected.map((id) => updateOrderStatus(id, editStatus)),
      );

      setEditOpen(false);
      setSelected([]);
      loadOrders();
    } catch (err) {
      console.error(err);
      alert("Не удалось изменить статус. Проверь консоль.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 bg-transparent text-[#111927] dark:text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-[700] text-[24px] text-[#111927] dark:text-white">
          {t("orders.title")}
        </h1>

        {totalCount > 0 && (
          <button className="flex items-center gap-2 bg-[#2f6fed] hover:bg-[#2560d6] text-white text-sm font-[600] px-4 py-2 rounded-lg">
            + {t("orders.addOrder")}
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-[#111927] border border-[#E5E7EB] dark:border-[#1F2937] rounded-[4px]">
        {totalCount > 0 && (
          <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB] dark:border-[#1F2937]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-[#6C737F] dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

                <input
                  type="text"
                  placeholder={t("orders.search")}
                  value={search}
                  onChange={(e) => {
                    setPage(1);
                    setSearch(e.target.value);
                  }}
                  className="h-[36px] pl-9 pr-3 rounded-md bg-[#F9FAFB] dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#1F2937] outline-none w-[220px] text-sm text-[#111927] dark:text-white"
                />
              </div>

              <select className="h-[36px] px-3 rounded-md bg-white dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#1F2937] outline-none text-sm text-[#111927] dark:text-white">
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </div>

            {selected.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={openEditModal}
                  className="p-2 rounded-md border border-[#E5E7EB] dark:border-[#1F2937] hover:bg-[#F9FAFB] dark:hover:bg-[#1F2937]"
                >
                  <Pencil className="w-4 h-4 text-[#6C737F] dark:text-slate-400" />
                </button>

                <button
                  onClick={() => setDeleteOpen(true)}
                  className="p-2 rounded-md border border-[#E5E7EB] dark:border-[#1F2937] hover:bg-[#F9FAFB] dark:hover:bg-[#1F2937]"
                >
                  <Trash2 className="w-4 h-4 text-[#F04438]" />
                </button>
              </div>
            )}
          </div>
        )}

        {isLoading ? (
          <div className="p-6 text-center text-[#6C737F] dark:text-slate-400">
            {t("orders.loading")}
          </div>
        ) : totalCount === 0 ? (
          <EmptyState />
        ) : (
          <>
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-[#E5E7EB] dark:border-[#1F2937]">
                  <th className="p-4 w-[40px]">
                    <input
                      type="checkbox"
                      checked={
                        selected.length === orders.length && orders.length > 0
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>

                  <th className="p-4 font-[400] text-[13px] text-[#6C737F] dark:text-slate-400">
                    {t("orders.order")}
                  </th>

                  <th className="p-4 font-[400] text-[13px] text-[#6C737F] dark:text-slate-400">
                    {t("orders.date")}
                  </th>

                  <th className="p-4 font-[400] text-[13px] text-[#6C737F] dark:text-slate-400">
                    {t("orders.customer")}
                  </th>

                  <th className="p-4 font-[400] text-[13px] text-[#6C737F] dark:text-slate-400">
                    {t("orders.paymentStatus")}
                  </th>

                  <th className="p-4 font-[400] text-[13px] text-[#6C737F] dark:text-slate-400">
                    {t("orders.orderStatus")}
                  </th>

                  <th className="p-4 font-[400] text-[13px] text-[#6C737F] dark:text-slate-400">
                    {t("orders.total")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#F2F4F7] dark:border-[#1F2937]"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selected.includes(order.id)}
                        onChange={() => toggleSelect(order.id)}
                      />
                    </td>

                    <td className="p-4 font-[500] text-[14px] text-[#111927] dark:text-white">
                      #{order.orderNumber}
                    </td>

                    <td className="p-4 text-[14px] text-[#6C737F] dark:text-slate-400">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>

                    <td className="p-4 text-[14px] text-[#6C737F] dark:text-slate-400">
                      {order.customerName}
                    </td>

                    <td className="p-4">
                      <StatusBadge
                        value={order.paymentStatus}
                        map={PAYMENT_STATUS}
                      />
                    </td>

                    <td className="p-4">
                      <StatusBadge value={order.status} map={ORDER_STATUS} />
                    </td>

                    <td className="p-4 text-[14px] text-[#111927] dark:text-white">
                      ${order.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-1">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="p-1.5 rounded border border-[#E5E7EB] dark:border-[#1F2937] text-[#111927] dark:text-white disabled:opacity-40 hover:bg-[#F9FAFB] dark:hover:bg-[#1F2937]"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from(
                  {
                    length: Math.min(totalPages, 6),
                  },
                  (_, i) => i + 1,
                ).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-[28px] h-[28px] rounded text-sm ${
                      p === page
                        ? "bg-[#2f6fed] text-white"
                        : "text-[#6C737F] dark:text-slate-400 hover:bg-[#F9FAFB] dark:hover:bg-[#1F2937]"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="p-1.5 rounded border border-[#E5E7EB] dark:border-[#1F2937] text-[#111927] dark:text-white disabled:opacity-40 hover:bg-[#F9FAFB] dark:hover:bg-[#1F2937]"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <span className="text-[13px] text-[#6C737F] dark:text-slate-400">
                {totalCount} {t("orders.results")}
              </span>
            </div>
          </>
        )}
      </div>

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            backgroundColor: "var(--dialog-bg)",
            color: "var(--dialog-text)",
          }}
        >
          {t("orders.deleteItems")}
        </DialogTitle>

        <DialogContent
          sx={{
            backgroundColor: "var(--dialog-bg)",
            color: "var(--dialog-text)",
          }}
        >
          {t("orders.deleteConfirmation")}
          {selected.length > 1 ? "s" : ""}
        </DialogContent>

        <DialogActions
          sx={{
            p: 2,
            backgroundColor: "var(--dialog-bg)",
          }}
        >
          <Button
            onClick={() => setDeleteOpen(false)}
            variant="outlined"
            sx={{ textTransform: "none" }}
          >
            {t("orders.cancel")}
          </Button>

          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{ textTransform: "none" }}
          >
            {t("orders.delete")}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            backgroundColor: "var(--dialog-bg)",
            color: "var(--dialog-text)",
          }}
        >
          {t("orders.changeOrderStatus")}
        </DialogTitle>

        <DialogContent
          sx={{
            backgroundColor: "var(--dialog-bg)",
            color: "var(--dialog-text)",
          }}
        >
          <Select
            fullWidth
            size="small"
            value={editStatus}
            onChange={(e) => setEditStatus(Number(e.target.value))}
            sx={{
              mt: 1,
              color: "var(--dialog-text)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E5E7EB",
              },
            }}
          >
            {Object.entries(ORDER_STATUS).map(([value, info]) => (
              <MenuItem key={value} value={Number(value)}>
                {info.label}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>

        <DialogActions
          sx={{
            p: 2,
            backgroundColor: "var(--dialog-bg)",
          }}
        >
          <Button
            onClick={() => setEditOpen(false)}
            variant="outlined"
            sx={{ textTransform: "none" }}
          >
            {t("orders.cancel")}
          </Button>

          <Button
            onClick={handleEditSave}
            variant="contained"
            disabled={isSaving}
            sx={{
              bgcolor: "#2f6fed",
              "&:hover": {
                bgcolor: "#2560d6",
              },
              textTransform: "none",
            }}
          >
            {isSaving ? `${t("orders.saving")}` : `${t("orders.save")}`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrdersPage;