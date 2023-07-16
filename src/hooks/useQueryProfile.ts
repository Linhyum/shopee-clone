import { useQuery } from '@tanstack/react-query'
import { getProfile } from 'src/apis/user.api'

export default function useQueryProfile() {
   const { data, refetch } = useQuery({
      queryKey: ['profile'],
      queryFn: getProfile
   })
   const profileData = data?.data.data
   return { profileData, refetch }
}
