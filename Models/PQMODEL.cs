using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Teacher_management_system.Models
{
    public class PQMODEL
    {
        public int RowPerPage { get; set; }
        public int CurrentPage { get; set; }

    }
    public class PQResult<T>
    {
        public T Records { get; set; }
        public int TotalCount { get; set; }


    }

    public class PqFinalResult
    {

        public List<Detail> AllData;

    }

    public class FinalResult
    {
        public dynamic Data { get; set; }
    }


}