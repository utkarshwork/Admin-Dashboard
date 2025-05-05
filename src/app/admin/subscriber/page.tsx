"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/admin-layout/AdminLayout";
import { TableWrapper } from "@/components/table-wrapper/table-wrapper";
import { Data } from "../participant/participant.types";
import { TableColumn } from "@/components/table-wrapper/table-wrapper.types";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Loader from "@/components/layout/loader/Loader";

const columns: TableColumn[] = [
  {
    id: "name",
    label: "Name",
    numeric: false,
    disablePadding: false,
    sortable: true,
  },
  {
    id: "email",
    label: "Email",
    numeric: false,
    disablePadding: false,
    sortable: true,
  },
];

// ✅ Static dummy data
const STATIC_PARTICIPANTS = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "Charlie Davis", email: "charlie@example.com" },
];

export default function SubscribersPage() {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(25);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [participants, setParticipants] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    // Simulate fetching and filtering
    const filtered = STATIC_PARTICIPANTS.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase()),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setParticipants(filtered as any);
    setIsLoading(false);
  }, [search]);

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (perPage: number, page: number) => {
    setPerPage(perPage);
    setPage(page);
  };

  const handleDeleteParticipants = (ids: number[]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const remaining = participants.filter((p) => !ids.includes(p.id as any));
    setParticipants(remaining);
    setSelected([]);
  };

  const viewAction = (row: Data) => {
    router.push(`participant/${row.id}`);
  };

  const exportCSV = () => {
    const rows =
      selected.length > 0
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          participants.filter((p) => selected.includes(p.id as any))
        : participants;
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Name,Email", ...rows.map((r) => `${r.name},${r.email}`)].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "subscriptionlist.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const importBtn = (
    <Button
      variant="contained"
      color="primary"
      onClick={exportCSV}
      disabled={isLoading}
    >
      Export
    </Button>
  );

  return (
    <AdminLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <TableWrapper
          title="Subscribers"
          columns={columns}
          data={participants}
          page={page}
          perPage={perPage}
          totalRecords={participants.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          sort={orderBy}
          sortorder={order}
          sortBy={(field: string, direction: "asc" | "desc") => {
            setOrderBy(field);
            setOrder(direction);
          }}
          search={search}
          searchBy={(query) => setSearch(query)}
          selected={selected}
          rowSelected={setSelected}
          modalType="participants"
          viewAction={viewAction}
          onDelete={handleDeleteParticipants}
          importBtn={importBtn}
          isLoading={isLoading}
        />
      )}
    </AdminLayout>
  );
}
