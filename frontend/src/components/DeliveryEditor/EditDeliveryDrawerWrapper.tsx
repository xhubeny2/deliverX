import { prisma } from '@/lib/prisma';
import EditDeliveryDrawer from '@/components/DeliveryEditor/EditDeliveryDrawer';
import { redirect } from 'next/navigation';
import { getDeliveryById } from '@/lib/data';

async function EditDeliveryDrawerWrapper({
  deliveryId,
  create,
}: {
  deliveryId: string;
  create?: boolean;
}) {
  if (create) {
    return <EditDeliveryDrawer />;
  }

  const delivery = await getDeliveryById(deliveryId);
  if (!delivery) {
    redirect('/dashboard/deliveries');
  }

  return <EditDeliveryDrawer delivery={delivery} />;
}

export default EditDeliveryDrawerWrapper;
