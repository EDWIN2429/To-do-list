import * as React from "react"
import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      // Contenedor con borde, esquinas redondeadas y sombra sutil
      className="relative w-full overflow-x-auto rounded-lg border border-[--color-table-divider] shadow-sm"
    >
      <table
        data-slot="table"
        // Eliminado el border-t ya que el contenedor lo maneja
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      // Fondo blanco y borde inferior con el color de divisor
      className={cn("bg-background border-b border-[--color-table-divider]", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        // Borde inferior y hover con las variables precisas
        "border-b border-[--color-table-divider] transition-colors data-[state=selected]:bg-muted",
        "hover:bg-[--color-table-hover]",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        // Padding, color de texto y alineación
        "h-auto px-4 py-3 text-left align-middle font-medium text-[--color-table-text] whitespace-nowrap",
        // Ejemplo de alineación para centrar contenido en algunas columnas:
        "[&:nth-child(3)]:text-center [&:nth-child(4)]:text-center [&:last-child]:text-center", 
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        // Padding y color de texto para las celdas
        "px-4 py-2.5 align-middle text-[--color-table-text] whitespace-nowrap",
        // Ejemplo de alineación para centrar contenido en algunas celdas:
        "[&:nth-child(3)]:text-center [&:nth-child(4)]:text-center [&:nth-child(5)]:text-center [&:last-child]:text-center", 
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}