import { useAuthContext } from '@app/auth/AuthContext';
import { CustomCalendar } from '@app/components/Calendar';
import { DataCard } from '@app/components/Card';
import { useTeacherDashboardService } from '@app/services/dashboard.service';
import Image from 'next/image';
import React from 'react';

export const TeacherDashboard = () => {
  const { authenticatedUser } = useAuthContext();
  const { teacherDashboardData } = useTeacherDashboardService(
    authenticatedUser?.id
  );
  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-2xl font-semibold">
        Welcome Back {authenticatedUser?.first_name} !
      </h1>
      <hr className="border border-gray-300" />
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-9">
          <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <DataCard
              title="Classes"
              icon={
                <Image
                  src={'/static/images/classes.png'}
                  height={64}
                  width={64}
                />
              }
              value={teacherDashboardData?.classes}
            />
          </section>
        </div>
        <aside className="col-span-3 hidden xl:block">
          <CustomCalendar />
        </aside>
      </section>
    </div>
  );
};
