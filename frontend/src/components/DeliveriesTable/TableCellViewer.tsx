import { Delivery } from '../../../generated/prisma/client';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import * as React from 'react';

export default function TableCellViewer({ item }: { item: Delivery }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button
          variant="link"
          className="text-foreground w-fit px-0 text-left font-bold underline decoration-dotted"
        >
          {item.orderNumber}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[85vh] sm:h-full sm:w-[400px] ml-auto">
        <DrawerHeader>
          <DrawerTitle>Detail Zásilky {item.orderNumber}</DrawerTitle>
          <DrawerDescription>ID: {item.id}</DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 p-4 overflow-y-auto">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success('Uloženo (Demo)');
              // Zde bys volal Server Action updateDelivery(item.id, formData)
            }}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="orderNumber">Číslo Objednávky</Label>
              <Input
                id="orderNumber"
                defaultValue={item.orderNumber}
                readOnly
                className="bg-muted"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="recipientName">Příjemce</Label>
              <Input id="recipientName" defaultValue={item.recipientName} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="address">Adresa</Label>
              <Input id="address" defaultValue={item.address} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="status">Stav</Label>
              <Select defaultValue={item.status}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Vyberte stav" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Čeká na zpracování</SelectItem>
                  <SelectItem value="IN_TRANSIT">Na cestě</SelectItem>
                  <SelectItem value="DELIVERED">Doručeno</SelectItem>
                  <SelectItem value="FAILED">Nedoručeno</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4">
              <Button type="submit" className="w-full">
                Uložit změny
              </Button>
            </div>
          </form>

          <div className="mt-4 border-t pt-4">
            <h3 className="text-sm font-medium mb-2">Historie (Demo)</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <div className="flex justify-between">
                <span>Vytvořeno</span>
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Zavřít</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
