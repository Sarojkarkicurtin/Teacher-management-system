using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Teacher_management_system.Models;

namespace Teacher_management_system.DbCon
{
    public class DbConn
    {
        private string connectionString = string.Empty;

        private SqlConnection sqlcon;

        public DbConn()
        {
            connectionString = ConfigurationManager.ConnectionStrings["myConnection"].ToString();

        }
        public void createConnection()
        {
            sqlcon = new SqlConnection(connectionString);

        }
        public void SaveData(Models.Teacherinfo data, out string message)
        {
            if (data.Teacherid == 0)
            {
                try
                {
                    createConnection();
                    SqlCommand cmd = new SqlCommand("TEACHERINFORMATION_SAVE", sqlcon);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    string jsonaddressdata = JsonConvert.SerializeObject(data.Addresslist);
                    string jsonmoduledata = JsonConvert.SerializeObject(data.moduleinfolist);
                    cmd.Parameters.AddWithValue("@SalutationId", data.SalutationId);
                    cmd.Parameters.AddWithValue("@firstname", data.firstName);
                    cmd.Parameters.AddWithValue("@lastName", data.LastName);
                    cmd.Parameters.AddWithValue("@Email", data.Email);
                    cmd.Parameters.AddWithValue("@Age", data.Age);
                    cmd.Parameters.AddWithValue("@phonenumber ", data.PhoneNumber);
                    cmd.Parameters.AddWithValue("@Gender ", data.Gender);
                    cmd.Parameters.AddWithValue("@nationalId ", data.nationalId);
                    cmd.Parameters.AddWithValue("@Addresslist", jsonaddressdata);
                    cmd.Parameters.AddWithValue("@moduleinfolist", jsonmoduledata);

                    sqlcon.Open();
                    cmd.ExecuteNonQuery();
                    sqlcon.Close();

                    message = "Success";

                }
                catch (Exception ex)
                {
                    message = ex.Message;
                }
            }

            else
            {
                try
                {
                    createConnection();
                    SqlCommand cmd = new SqlCommand("updateallTeacherinfo", sqlcon);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("TeacherId", data.Teacherid);
                    string jsonaddressdata = JsonConvert.SerializeObject(data.Addresslist);
                    string jsonmoduledata = JsonConvert.SerializeObject(data.moduleinfolist);
                    cmd.Parameters.AddWithValue("@SalutationId", data.SalutationId);
                    cmd.Parameters.AddWithValue("@firstname", data.firstName);
                    cmd.Parameters.AddWithValue("@lastName", data.LastName);
                    cmd.Parameters.AddWithValue("@Email", data.Email);
                    cmd.Parameters.AddWithValue("@Age", data.Age);
                    cmd.Parameters.AddWithValue("@phonenumber ", data.PhoneNumber);
                    cmd.Parameters.AddWithValue("@Gender ", data.Gender);
                    cmd.Parameters.AddWithValue("@nationalId ", data.nationalId);
                    cmd.Parameters.AddWithValue("@Addresslist", jsonaddressdata);
                    cmd.Parameters.AddWithValue("@moduleinfolist", jsonmoduledata);

                    sqlcon.Open();
                    cmd.ExecuteNonQuery();
                    sqlcon.Close();

                    message = "Success";

                }
                catch (Exception ex)
                {
                    message = ex.Message;
                }
            }

        }
        public List<Detail> GetData()
        {
            List<Detail> TeacherList = new List<Detail>();
            string CS = ConfigurationManager.ConnectionStrings["myConnection"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("SELECTDETAIL", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                con.Open();

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    var detail = new Detail();

                    detail.Teacherid = int.Parse(rdr["Teacherid"].ToString());
                    detail.SalutationId = int.Parse(rdr["SalutationId"].ToString());
                    detail.Salutation = rdr["SalutationName"].ToString();
                    detail.firstName = rdr["firstName"].ToString();
                    detail.LastName = rdr["LastName"].ToString();
                    detail.Age = rdr["Age"].ToString();
                    detail.PhoneNumber = rdr["PhoneNumber"].ToString();
                    detail.Email = rdr["Email"].ToString();
                    detail.Gender = rdr["Gender"].ToString();
                    detail.nationalId = int.Parse(rdr["nationalId"].ToString());
                    detail.Nationality = rdr["Nationality"].ToString();

                    TeacherList.Add(detail);
                }
                //return View(PersonalList);
                return TeacherList;
            }
        }

        public List<Salutation> SalutationData()
        {
            List<Salutation> SList = new List<Salutation>();
            string CS = ConfigurationManager.ConnectionStrings["myConnection"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("SELECT * FROM salutation", con);
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    var salutation = new Salutation();

                    salutation.SalutationId = int.Parse(rdr["SalutationId"].ToString());
                    salutation.SalutationName = rdr["SalutationName"].ToString();


                    SList.Add(salutation);
                }
                con.Close();
                return SList;
            }
        }
        public List<NationalityM> NationalityTypeData()
        {
            List<NationalityM> NList = new List<NationalityM>();
            string CS = ConfigurationManager.ConnectionStrings["myConnection"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("SELECT * FROM Nationality", con);
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    var nationality = new NationalityM();

                    nationality.nationalId = int.Parse(rdr["nationalId"].ToString());
                    nationality.Nationality = rdr["Nationality"].ToString();


                    NList.Add(nationality);
                }
                con.Close();
                return NList;
            }
        }
        public List<AddressTypeM> AddressTypeData()
        {
            List<AddressTypeM> ADList = new List<AddressTypeM>();
            string CS = ConfigurationManager.ConnectionStrings["myConnection"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("SELECT * FROM AddressType", con);
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    var addresstype = new AddressTypeM();

                    addresstype.AddressTypeId = int.Parse(rdr["AddressTypeId"].ToString());
                    addresstype.AddressType = rdr["AddressType"].ToString();


                    ADList.Add(addresstype);
                }
                con.Close();
                return ADList;
            }
        }
        public List<ProvinceM> ProvinceData()
        {
            List<ProvinceM> PRList = new List<ProvinceM>();
            string CS = ConfigurationManager.ConnectionStrings["myConnection"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("SELECT * FROM province", con);
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    var province = new ProvinceM();

                    province.ProvinceId = int.Parse(rdr["ProvinceId"].ToString());
                    province.Province = rdr["Province"].ToString();


                    PRList.Add(province);
                }
                con.Close();
                return PRList;
            }
        }
        public List<CityM> CityData()
        {
            List<CityM> CTList = new List<CityM>();
            string CS = ConfigurationManager.ConnectionStrings["myConnection"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("SELECT * FROM city", con);
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    var city = new CityM();

                    city.CityId = int.Parse(rdr["CityId"].ToString());
                    city.City = rdr["City"].ToString();


                    CTList.Add(city);
                }
                con.Close();
                return CTList;
            }
        }
        public List<ClassM> ClassData()
        {
            List<ClassM> CSList = new List<ClassM>();
            string CS = ConfigurationManager.ConnectionStrings["myConnection"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("SELECT * FROM class", con);
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    var class1 = new ClassM();

                    class1.ClassId = int.Parse(rdr["ClassId"].ToString());
                    class1.Class = rdr["Class"].ToString();


                    CSList.Add(class1);
                }
                con.Close();
                return CSList;
            }
        }
        public List<SectionM> SectionData()
        {
            List<SectionM> STList = new List<SectionM>();
            string CS = ConfigurationManager.ConnectionStrings["myConnection"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("SELECT * FROM section", con);
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    var sections = new SectionM();

                    sections.SectionId = int.Parse(rdr["SectionId"].ToString());
                    sections.Section = rdr["Section"].ToString();


                    STList.Add(sections);
                }
                con.Close();
                return STList;
            }
        }

        public Teacherinfo Editmydata(int? id)
        {
            Teacherinfo teacherInfo = new Teacherinfo();

            List<Teacheraddress> AddList = new List<Teacheraddress>();
            List<Teachermoduleinfo> modList = new List<Teachermoduleinfo>();
            string CS = ConfigurationManager.ConnectionStrings["myConnection"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("EditTeacherinfo", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Teacherid", id);
                con.Open();

                SqlDataReader rdr = cmd.ExecuteReader();
                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        teacherInfo.Teacherid = Convert.ToInt32(rdr["Teacherid"]);
                        teacherInfo.SalutationId = Convert.ToInt32(rdr["SalutationId"]);
                        teacherInfo.Salutation = rdr["SalutationName"].ToString();
                        teacherInfo.firstName = rdr["firstName"].ToString();
                        teacherInfo.LastName = rdr["LastName"].ToString();
                        teacherInfo.Age = rdr["Age"].ToString();
                        teacherInfo.PhoneNumber = rdr["PhoneNumber"].ToString();
                        teacherInfo.Email = rdr["Email"].ToString();
                        teacherInfo.Gender = rdr["Gender"].ToString();
                        teacherInfo.nationalId = Convert.ToInt32(rdr["nationalId"]);
                        teacherInfo.Nationality = rdr["Nationality"].ToString();


                    }
                }

                if (rdr.NextResult())
                {
                    while (rdr.Read())
                    {
                        AddList.Add(new Teacheraddress
                        {
                            AddressType = rdr["AddressType"].ToString(),
                            AddressTypeId = Convert.ToInt32(rdr["AddressTypeId"]),
                            Province = rdr["Province"].ToString(),
                            ProvinceId = Convert.ToInt32(rdr["ProvinceId"]),
                            City = rdr["City"].ToString(),
                            CityId = Convert.ToInt32(rdr["CityId"]),
                            Ward = rdr["Ward"].ToString(),
                            Tole = rdr["Tole"].ToString()
                        });

                        teacherInfo.Addresslist = AddList;
                    }
                }


                if (rdr.NextResult())
                {
                    while (rdr.Read())
                    {
                        modList.Add(new Teachermoduleinfo
                        {
                            Courses = rdr["Courses"].ToString(),
                            ClassId = Convert.ToInt32(rdr["ClassId"]),
                            SectionId = Convert.ToInt32(rdr["SectionId"]),
                            Class = rdr["Class"].ToString(),
                            Section = rdr["Section"].ToString(),
                            SelectedShift = rdr["Shift"].ToString()





                        });

                        teacherInfo.moduleinfolist = modList;
                    }
                }
                con.Close();
                return teacherInfo;

            }
        }


        public void Deletedata(int? id, out string message)
        {
            try
            {
                createConnection();
                SqlCommand cmd = new SqlCommand("deleteTeacherinfo", sqlcon);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@TeacherId", id);
                sqlcon.Open();
                cmd.ExecuteNonQuery();
                sqlcon.Close();

                message = "Success";

            }
            catch (Exception ex)
            {
                message = ex.Message;
            }

        }


        public PQResult<PqFinalResult> GetAllData(PQMODEL requestData)
        {
            int totalRecords = 0;
            PqFinalResult resultData = new PqFinalResult();
            List<Detail> list = new List<Detail>();

            createConnection();
            SqlCommand cmd = new SqlCommand("SP_REMOTE_DATA", sqlcon);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.Add("@SKIP_COUNT", SqlDbType.Int).Value = (requestData.CurrentPage - 1) * requestData.RowPerPage;
            cmd.Parameters.Add("@ROW_COUNT", SqlDbType.Int).Value = requestData.RowPerPage;
            sqlcon.Open();
            SqlDataReader rdr = cmd.ExecuteReader();
            if (rdr.HasRows)
            {

                while (rdr.Read())
                {
                    var detail = new Detail();

                    detail.Teacherid = int.Parse(rdr["Teacherid"].ToString());
                    detail.SalutationId = int.Parse(rdr["SalutationId"].ToString());
                    detail.Salutation = rdr["SalutationName"].ToString();
                    detail.firstName = rdr["firstName"].ToString();
                    detail.LastName = rdr["LastName"].ToString();
                    detail.Age = rdr["Age"].ToString();
                    detail.PhoneNumber = rdr["PhoneNumber"].ToString();
                    detail.Email = rdr["Email"].ToString();
                    detail.Gender = rdr["Gender"].ToString();
                    detail.nationalId = int.Parse(rdr["nationalId"].ToString());
                    detail.Nationality = rdr["Nationality"].ToString();

                    

                    list.Add(detail);
                }
            }
            if (rdr.NextResult() && rdr.HasRows && rdr.Read())
            {
                totalRecords = rdr.GetInt32(0);
            }

            sqlcon.Close();

            resultData.AllData = list;

            return new PQResult<PqFinalResult>
            {
                Records = resultData,
                TotalCount = totalRecords
            };
        }
    }
}