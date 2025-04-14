// import { useEffect } from 'react';
// import { useContext } from 'react';
// import { AuthContext } from '@/context/AuthContext';
// import * as userStoneProgressEndpoints from '@/helpers/userStoneProgressEndpoints';

// interface UseUpdateUserScreenProgressProps {
//   stoneIndex: number;
//   screenIndex: number;
//   screenPathname: string;
//   lastCompletedStoneIndex: number; // Pass the user's last_completed_stone_index
// }

// export function useUpdateUserScreenProgress({
//   stoneIndex,
//   screenIndex,
//   screenPathname,
//   lastCompletedStoneIndex,
// }: UseUpdateUserScreenProgressProps) {
//   const { currentUser } = useContext(AuthContext);

//   useEffect(() => {
//     if (!currentUser?.sub) return;

//     // check if stone is already completed
//     if (stoneIndex <= lastCompletedStoneIndex) {
//       console.log('Stone already completed, not updating progress.');
//       return;
//     }

//     (async () => {
//       try {
//         const userStoneProgress: any = {
//           userID: currentUser.sub,
//           current_stone_index: stoneIndex,
//           current_screen_index: screenIndex,
//           current_screen_pathname: screenPathname,
//         };

//         await userStoneProgressEndpoints.updateUserStoneProgress(userStoneProgress);
//       } catch (error) {
//         console.error('Error updating user screen progress:', error);
//       }
//     })();
//   }, [currentUser?.sub, stoneIndex, screenIndex, screenPathname, lastCompletedStoneIndex]);
// }

import { useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import * as userStoneProgressEndpoints from '@/helpers/userStoneProgressEndpoints';

interface UseUpdateUserScreenProgressProps {
  stoneIndex: number;
  screenIndex: number;
  screenPathname: string;
  inProgress: boolean;
}

export function useUpdateUserScreenProgress({
  stoneIndex,
  screenIndex,
  screenPathname,
  inProgress,
}: UseUpdateUserScreenProgressProps) {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser?.sub) return;

    if (!inProgress) {
      console.log('⏭️ Skipping update because not in-progress.');
      return;
    }

    (async () => {
      try {
        const userStoneProgress = {
          userID: currentUser.sub,
          current_stone_index: stoneIndex,
          current_screen_index: screenIndex,
          current_screen_pathname: screenPathname,
        };

        console.log('✅ Updating user screen progress:', userStoneProgress);

        await userStoneProgressEndpoints.updateUserStoneProgress(userStoneProgress);
      } catch (error) {
        console.error('❌ Error updating user screen progress:', error);
      }
    })();
  }, [currentUser?.sub, stoneIndex, screenIndex, screenPathname, inProgress]);
}



