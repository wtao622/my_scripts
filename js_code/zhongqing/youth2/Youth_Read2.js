/*
更新时间: 2021-02-28 09:03
Github Actions使用方法见[@lxk0301](https://raw.githubusercontent.com/lxk0301/scripts/master/githubAction.md) 使用方法大同小异

点击几篇文章和视频，自动获取阅读请求，在Github Actions中的Secrets新建name为'YOUTH_READ'的一个值，拷贝抓包的请求体到下面Value的文本框中，添加的请求体越多，获得青豆次数越多，本脚本不包含任何推送通知

多个请求体时用'&'号或者换行隔开" ‼️

*/

const $ = new Env("中青看点阅读")
//const notify = $.isNode() ? require('./sendNotify') : '';
let ReadArr = [''], timebodyVal ="";
let YouthBody = 'p=9NwGV8Ov71o%3DGvDnjwMsu_lk8V15hrmPeFtKCBAoDX5kqrLpJGAkdwV8gOpPHTnSb2QKBwoKGMeR-g4wXbH-JFVHui_GJ_eDtL_7UlS3wlSTVKD_CXKxs1zUQlU1oXOPEi_OHWbxroJ8QI33jnuqbzJbUPziaTnKYbGBvOI1-Jwe6EZfsYplHP01Y92LWykV1kSnfR0siZpYB-okzXYej9AV0J37fewId2aAvcIxb-ZkqcAw-zCExuqH2fZZ80nUvGH7Utrk8y0TvO8skYBp4rxX7cq6rYmJVMONyvlfAg1Dqif1y5TUxacyz7vO7lAMVCB26wjNryH9F8O9LMGO8BRaGNyPGqDp7xYUqEtqfqILwkaFKeX9LJPEJZMOIyBr-GKFkCIRbfYz3y3skOv-gJj9KcFlouiQijj5Hl0XBFkBtPoMYJ7qJDdIVAznBgBXoTpeBI201tlJu37DbLpA8IdunG8BJmAmqr93Ee3aogl_jIZiHDdb2KR3Zj3URykdRz-wxn7P2uTIpKeNfy96Uwm9VJ7xr4JG7WNkQVmdfM7SwHU3atAtzSxdBkykDvOHgTZ5PHhBs3GMEstb_fphZZgyKZ2DJs38jfiZPcjVItqrtv_bvbNQXOu0f2dEa9Lj78CXt831a5g43uBc2r6UZBZ0ftdyqaxIsTtDzkgWmbCqQD_PgRnMMJu-Bygotqgpgv5I9-yKpWCvx0dGulMzU3dq3rJPva1A1qrubpBPVAHAKLa8a8g-lkv2pB0mUN-v8Avws_G0zKZD6-34PALwuKSyIONP4jlgmEEMFd3EWOX8kKEB3KpFB0eolGlNDyWMHfMOoAKXzxBMNtPgURLnxw7lS-99mWp-aUXKGyB9tSvwVG1NMNOyYt82AbL9c-RxTJq5cGGalErR&p=9NwGV8Ov71o%3DGvDnjwMsu_lk8V15hrmPeFtKCBAoDX5kqrLpJGAkdwUFrZElDt7JkNPoukCr4LNBcsHUql0CIKl2I8U01IbyRPIMjn9MbDYxaGA86bW6ZMX1tpuS8JuFkn10U6RN5q-ZsAgn7Pj6x2RlmTm_ETr0BFNc48V7zfUBE2iCaPoHKp7Pe0A5iwitQ9P9me2wBTv04i1Sf62aeHwrt6yQRVwr0thcRkxD4HbLImOo0y7jM05menv_5t6z4E7veJT73rjrVkDDT-D8T5fBAqPD3knPncHf72D-5YPZ8EM6sT5FcUSkXf6srQ-b2sOfmV8jAOwfYbCVv1in6c0tnEN0dPry6qbSPCKHOgIV3jIJ-xUKRmc98h6WuSILxeHmiHXffTA7VIPQSvv48jo4ra7ou9qv6y7aI9X4gGSnpLUJ9LiHOXKc7UlVoLlGcZgdf8XVMty-VGYyg1TfZ776Wyo7_UyN8i4muuyTkHO_ZCUpquDIcYTQWmmbGBJpeUToA9pUT-slCXB_PCf_8pdOtIciLL9GZ2K6QZtrwVtz1XHnaPLxbbbj7ZsRnheXchvjYrcW4B3JPTeph1D8EZU9z7Fe2lvuAC3vgo9efyiGyWZSnVJXvdBODrU6TygoBS_wbIaKkmPOwMIxmuOj_Isr1z-QL4ORKFei6NqRm_pUxgbBHQRLfrYvUQ_UZlTbkD7VB2JVff3dY6ScjIv0HSbGWbJDOJGkT9Tt8lrO8GrnYgNPwFCCGT5_MItEHL_xiBAUJBk0yG5k90ZnoZI3_u_2oRaYk85dCGTpjdVjJvb8KQ65yQh0T-BqUSROkNpjtJBmNLpyW09Lhq6FmaYwB0t9cj3R83w_QfJF-TkY9jrvHnQhQjI62YQ%3D&p=9NwGV8Ov71o%3DGvDnjwMsu_lk8V15hrmPeFtKCBAoDX5kqrLpJGAkdwUFrZElDt7JkNPoukCr4LNBcsHUql0CIKl2I8U01IbyRPIMjn9MbDYxaGA86bW6ZMX1tpuS8JuFkn10U6RN5q-ZsAgn7Pj6x2RlmTm_ETr0BFNc48V7zfUBE2iCaPoHKp7Pe0A5iwitQ9P9me2wBTv04i1Sf62aeHwrt6yQRVwr0thcRkxD4HbLImOo0y7jM05menv_5t6z4E7veJT73rjrVkDDT-D8T5fBAqPD3knPncHf72D-5YPZ8EM6sT5FcUSkXf6srQ-b2p-6BZx28nshgcHSEEGXK69uvMDBOEjP88K_3gQmoSqeXbU6dwRLRdoyKStx-vqXrsEPiCmMawGh6QsGn37CYO23UP_soA8a-kQh5rkz0cGcjJCZqWINPFblNNwDzHwcWOxTR8QEnL1-4BBf-2Ao4kD75DtQjzgbgEDDi-W4FYKfYC3w8oVI6PtSTb29PRcOzN_V_nourWRzXRzMk__NFWowy032olRdTKKX2OqvuFKNrG5nOAbmCSuHo4qnygbMYSNB8Y-biV22vnf8_t9Ej_WwuTqULtUaeoK333DpgKRahBWxw2oWcflAb5b0fAdBj4uBgiycqVc-6Tvd_mtw-kyGe53QQqwVgwf2B1TCSK4uU23gZ3v50aowkS9og9D7_v8Kj0mF4Da7C8QFvmhUlqllEJjvt35Kl59NyKRD2Iu-mOsT8ho2S1TmzyXFYvpiUebvCihf3rER0t6aDbmNgV7XxqPqSEyP-dGunc1MdDdLDrxQ1sZweZ1yvS147GpG8upD4qkuGxHmHw76AWtgI9bPZM7JAHxtfpPGa5pvl_I_eXP11D_yUZA%3D&p=9NwGV8Ov71o%3DGvDnjwMsu_lk8V15hrmPeFtKCBAoDX5kqrLpJGAkdwUFrZElDt7JkNPoukCr4LNBcsHUql0CIKl2I8U01IbyRPIMjn9MbDYxaGA86bW6ZMX1tpuS8JuFkn10U6RN5q-ZsAgn7Pj6x2RlmTm_ETr0BFNc48V7zfUBE2iCaPoHKp7Pe0A5iwitQ9P9me2wBTv04i1Sf62aeHwrt6yQRVwr0thcRkxD4HbLImOo0y7jM05menv_5t6z4E7veJT73rjrVkDDT-D8T5fBAqPD3knPncHf72D-5YPZ8EM6sT5FcUSkXf6srQ-b2v1rv4kauCRCJbMLNHYwyFnZOWpMLbZ7zd9MIWiq-bivKh-yFWDNjRm2AZvID6L4mzhb6HgP4lU9ToRo1KojDLpr5bpZeUFZmqfwtGpG773fFZqG7M9R24NjNoc0d1EiP-ef2IYNX6XHYCZxhNJRboKyVgwBOJKkwTRNkhgXvTbu7EsMRaJysnqVLkVdl87Hx1tnRhXd8Yoq16nmZHDzzBFf-rASZYygvCXH4HYKWp2DQ7RMY-WPT3cXmbVAmrrmAN5mYMunK2AFoZ_c9EI3NQgmN7XydT19YWNxg-J6BKk_EMf1TA5JQUt3TPGXf-UEnpEoe4PPTwQlQ-N0uULAOLbbiNCGiNJnWM5cXOg99qSwa5svsK8uYk0GAKGaj6VsW2U6Sdrt3IB5Dmjkp8y5_1zNaTyuIrp3dIaJccTsFn_FW5XF2iuOJ6bKaDL3zuyUvFbnBv5aHqSkNFa206MDnSjhuIbgcGaNQd3syfvGVe6yQ6OP9T3EQm6PEpAIVMYMQIpQEXdGAQd9eFJ85Gvrd4z4HtG82beWJNAGWqYLQPXcUcQlzt4XSeQ%3D&p=9NwGV8Ov71o%3DGvDnjwMsu_lk8V15hrmPeFtKCBAoDX5kqrLpJGAkdwUFrZElDt7JkNPoukCr4LNBcsHUql0CIKl2I8U01IbyRPIMjn9MbDYxaGA86bW6ZMX1tpuS8JuFkn10U6RN5q-ZsAgn7Pj6x2RlmTm_ETr0BFNc48V7zfUBE2iCaPoHKp7Pe0A5iwitQ9P9me2wBTv04i1Sf62aeHwrt6yQRVwr0thcRkxD4HbLImOo0y7jM05menv_5t6z4E7veJT73rjrVkDDT-D8T5fBAqPD3knPncHf72D-5YPZ8EM6sT5FcUSkXf6srQ-b2jDiEu-ZietrlWlv32BVTxOAjsy0KliHfQUzhcN8Esj2Ba5RCUNVIPLmR5p_Fbd6CbmL3wZ9W2CmZe_Shd6V5q2oto0RNh45HpVEJ942oijpRM51zkKTLmsoI6zW3cWNoinczR1_2c6MOWf3xlHVBxK1JCfzb3t2UwKzyMYZ1IHLJf89oVSrRyjHlDcH_5X8nGXbHmTOznVPJpWJsTLMhe3mWtTyx3FsPbzuDPqFWL7KaydlqvnBBKmykhkiopiBGa3LrKqUpGxdES5h94xxoRre6GAZQcEV81hn6L11qAcRwG2MznKwD_Kwv4Nea8fRzpM44JyeX9d1z9RF5viDFgbYBqpqgPYjio5BFdWj-AetHhpQdiPPRodXGCD7-yy9K4EWZSAEOzeQ4aU5ZUe-lQLBVUbFPkyA8q_04xUYeUL60zm_8JVHmswIL0BJtjIan2qpkUCP_mj0y8UyddssCo33ecEuLTbdN067eqFUlcocSNnlmQPKbqX9COcEbZrl2j6fDNvAUD8cTM9iA_bugsxTBn2MXLbOkGBzhIY5srGFJX8Qoco8tLY%3D&p=9NwGV8Ov71o%3DGvDnjwMsu_lk8V15hrmPeFtKCBAoDX5kqrLpJGAkdwUFrZElDt7JkNPoukCr4LNBcsHUql0CIKl2I8U01IbyRPIMjn9MbDYxaGA86bW6ZMX1tpuS8JuFkn10U6RN5q-ZsAgn7Pj6x2RlmTm_ETr0BFNc48V7zfUBE2iCaPoHKp7Pe0A5iwitQ9P9me2wBTv04i1Sf62aeHwrt6yQRVwr0thcRkxD4HbLImOo0y7jM05menv_5t6z4E7veJT73rjrVkDDT-D8T5fBAqPD3knPncHf72D-5YPZ8EM6sT5FcUSkXf6srQ-b2kKsPtVNwmDmIYLLFeeEB_YO-d-fJl5MHdWsOg9Xu48wGGlYQCCwybG3bOqCkwPveO0wm3QRBq3ZdZhr4fVvyWJNLl4hPMIwYOoYIlj9xTIkDA6dqQ9JaAljZqRxBNQMJw2DLSRAf_IXrLvGcSVgkxPEJgsruJJ9qrF5SnhUsVE059yVAWyhqaqGcGWXuYMX5joEquMIgPh5Kmit0EO2lGUttkMtUTTnaXgsR98c3qxyD9HZ0AOqZt6E3U79UMJZlrjOICI_Yq8kzYbVfb6QyJ_SJUuvmr7Nczxcwbr-9E78bQdP-ewu_LA27WDtuYFHA6C2zFsEfTAPig28W7bdkrjMIC0GHpfOxGnNDoez22RFyKJ3DSgtd8RojdYhQZkhCFH1FAmzMZes0xOtkScTNHIeF-L_AFD2j-2siqkjfEkqNAnpDu_ATzOFpIKHVYv90XokryjWj8nRs9aOQDb-BVAfIg8_su9f2AJxglonx-pYkARwuxJEqIPPUia99SZ86HhyTVW7F1_x8HQiqei1UFdTUEPBNv6oOe87leA3SHbfxLdIYDPfSLI%3D&p=9NwGV8Ov71o%3DGvDnjwMsu_lk8V15hrmPeFtKCBAoDX5kqrLpJGAkdwUFrZElDt7JkNPoukCr4LNBcsHUql0CIKl2I8U01IbyRPIMjn9MbDYxaGA86bW6ZMX1tpuS8JuFkn10U6RN5q-ZsAgn7Pj6x2RlmTm_ETr0BFNc48V7zfUBE2iCaPoHKp7Pe0A5iwitQ9P9me2wBTv04i1Sf62aeHwrt6yQRVwr0thcRkxD4HbLImOo0y7jM05menv_5t6z4E7veJT73rjrVkDDT-D8T5fBAqPD3knPncHf72D-5YPZ8EM6sT5FcUSjANtnm0oMhr81AQZIG_1E1fcqry_a2iNRDat2c3TttuYBhd78usoaioeEsfL0DpbEzP12mq3DJEsxkUwCqxCHzTTsOaxB2XG_DsWLIzUAytc3scrMAqaj9NsW_X9yfJLX8Q9nbnMSupK4aNwT398y1SjhN9fGVZeR6SAHpoXh1EbVghrpsY5v-qkWfY1l4JNgJaVP3q5a1Hhufn5HZEoa9wFvy0G9e6WfL_uKP5jCgLtG_CuizVbs0Uy4DJNuV-xdXyGZLVMsJedWCsEbpo89EP72AR8w6MWjis532Mg19-QfiV3L2QqKFR-rzruxDGuZ6UmvPO7gujsISgV9DouqcLZpuGMQn_zutkxkEVPYV9a2z7vHdhg3ntV5ZrDZlqbHaQWT6-OrifjbneJZ8HnhbNWezM0v_F4KSptPPzAExsm10AUYQYn_dBpilUie_CrpeCJcrsxC5WIhVcX2WQzsOao7QAQVnrrJTvWI-wh6Xdj9LCXy4hq8pZU2rO3Ovg5FbCnXZRxQj2LgxgFMeTUrJurrFAp24t1jV-h2jncUmgTW-RS8QrU8eNUIgxqskmw%3D&p=9NwGV8Ov71o%3DGvDnjwMsu_lk8V15hrmPeFtKCBAoDX5kqrLpJGAkdwUFrZElDt7JkNPoukCr4LNBcsHUql0CIKl2I8U01IbyRPIMjn9MbDYxaGA86bW6ZMX1tpuS8JuFkn10U6RN5q-ZsAgn7Pj6x2RlmTm_ETr0BFNc48V7zfUBE2iCaPoHKp7Pe0A5iwitQ9P9me2wBTv04i1Sf62aeHwrt6yQRVwr0thcRkxD4HbLImOo0y7jM05menv_5t6z4E7veJT73rjrVkDDT-D8T5fBAqPD3knPncHf72D-5YPZ8EM6sT5FcUSkXf6srQ-b2rtFgvZpC8aJmTkVhYy12WHLcngUxi9-_JfNBnpUqFpOzTjF5SaEBnqBmfzQHHegLTEwD9sEFHALfZOhfe4SOwShLaWbJ6F-O_fI6d0EfbmIVcUMSeJM2-G2S4MXBH9CMAsQ9hE-yDFPzt15mViRzj1U2KnmxWv1qAlSlA2QOifiklTcqfXKHd3jV7tewwTUeAjHqtRCPnoPbj6iNdEQRAR55bil9U6aU6gI7WUDAelg3VRW9pyYbtxev0YPe8aOCaJzQnsbkrozeFMH-HJ75lCn0mszNEs2HeBwofqzS4P49VpJdNPA3ohf6Abe8GuDtk5CU-VQC_PGrbWgA6fmLejt6KC18uM0gjhwJevz66GtnqZiM-NNJmVcDNlLPTYZw4gXT7RbubudyS8hJC7skN5-eUEtnlnCRyxLnI2t5lJbbuMuQUAxjQ7caAdI5wrq24FpmBrJv8LuK6zPqjvmndZEDBdNXzm9pxOA11IITxLn98bMA8FHfet-qmy7YrEIqVKlxOFR5Ldsa-8enPc-s5-UV0FdG2u8GqhOWzk-cjvSyia9AFEegM8%3D&p=9NwGV8Ov71o%3DGvDnjwMsu_lk8V15hrmPeFtKCBAoDX5kqrLpJGAkdwUFrZElDt7JkNPoukCr4LNBcsHUql0CIKl2I8U01IbyRPIMjn9MbDYxaGA86bW6ZMX1tpuS8JuFkn10U6RN5q-ZsAgn7Pj6x2RlmTm_ETr0BFNc48V7zfUBE2iCaPoHKp7Pe0A5iwitQ9P9me2wBTv04i1Sf62aeHwrt6yQRVwr0thcRkxD4HbLImOo0y7jM05menv_5t6z4E7veJT73rjrVkDDT-D8T5fBAqPD3knPncHf72D-5YPZ8EM6sT5FcUSkXf6srQ-b2i3mp74PTngdfPuFVlQmDL2rBaIuTtL0SNyy2JgwGpPMFKeCttfKIwAnCxNq5xot2EP5d61vV4WNRcVIq2RvDd2-KPjKFISLSSpngKBDEwTUEWmxj_b4z89c39-xhWPYTqzGIx3TaSh4C0RNgjTBbuwppOFIHPkCsjxR0oEiamwXfc-QUSsh3V4ESEUhwfOLDaXjvFghAhkPqpt-Ok6-SWuDt1dEUy7uUiiApNeogcqpEdURVxHwfWpI0AqeVmYtjo9aAHWjfXWUm6fnYz_C3lgwW6va9hODZ3CcxfEllYIDjW_oEkydzoF_SOIgmUi2yemHUuJiIc-QBhG16iqNK-4wXOhRtJwhzkZZCIK9kz5au9kwmMQiH8MdYPlPCsd79YDAU59QWYXma0mx4KC1qHo2TahaFuHR7vz73hhvI_wykNVdytgtsPToozTrUSBNK0dQFun59kLE3QCr0AeOSFNbAH3KQG6_o8GqTCW6YfLwzl_z5kTVHjySs9y7tDvBpdOQrkPhLJmI0G8fGFpQKiZtQGYJmE9YAezbO4LTW-9C7aWEq547YCo%3D&p=9NwGV8Ov71o%3DGvDnjwMsu_lk8V15hrmPeFtKCBAoDX5kqrLpJGAkdwUFrZElDt7JkNPoukCr4LNBcsHUql0CIKl2I8U01IbyRPIMjn9MbDYxaGA86bW6ZMX1tpuS8JuFkn10U6RN5q-ZsAgn7Pj6x2RlmTm_ETr0BFNc48V7zfUBE2iCaPoHKp7Pe0A5iwitQ9P9me2wBTv04i1Sf62aeHwrt6yQRVwr0thcRkxD4HbLImOo0y7jM05menv_5t6z4E7veJT73rjrVkDDT-D8T5fBAqPD3knPncHf72D-5YPZ8EM6sT5FcUSjANtnm0oMhkR8Qp683z87TO93U0WaorEoPer2Kl44WgmrZwIUE50-YXnzfbQohUC5HVkUHdjsHUQbfdthLERSHxm4nGijVLBsithfiuVetWM3mOBxMz62VLdoGWhbrCxlN6IdhWhgAWDQSE1YPi4OF-C563JaNecLZGQJtnQveztpLyPv6T7fcXdsbq2JdMb-EByltsEoGJDjZhGd00yiDtjuunkItloAtiNSflfsF5DEFKpcCZIVuP_8ufbawXra_JF2znAUe1jPkk9mYlyA3gKi8SZCmyMCMMBI6Uagx2raq73yv-RJ57sxQl86Tp2QXC1jhTtEBxRPIxos6QVsnh8oIhUBLDP9y8N7oBvNbNgAhATN0tZSQ5ghKlotUUCVVwkzWZ770kHtSoFtCxeq7o6YBxX_AOKa6n18vfjc2v_Nvi3-D0AKqijc9LwjhV2iUyMTzkBpJ0fz4BPUgJNy07s2xx4vNbJn0QHyuY6sLOPaLFdiy1TMWMIVUV3vQ6Ksyh-ZA5i_e8Fr_t8k2kSvbh4z0RKU8U0y6oee2z4stwxX7s1aWzq653A0t9To5eA%3D&p=9NwGV8Ov71o%3DGvDnjwMsu_lk8V15hrmPeFtKCBAoDX5kqrLpJGAkdwUFrZElDt7JkNPoukCr4LNBcsHUql0CIKl2I8U01IbyRPIMjn9MbDYxaGA86bW6ZMX1tpuS8JuFkn10U6RN5q-ZsAgn7Pj6x2RlmTm_ETr0BFNc48V7zfUBE2iCaPoHKp7Pe0A5iwitQ9P9me2wBTv04i1Sf62aeHwrt6yQRVwr0thcRkxD4HbLImOo0y7jM05menv_5t6z4E7veJT73rjrVkDDT-D8T5fBAqPD3knPncHf72D-5YPZ8EM6sT5FcUSkXf6srQ-b2lasNKb37tU_zayRTdWj392pnlEphQFU0qs0cbkRnuZkiAR-3DZy6qo_JvrtVYYCs2FjF6yk7pR-ttMpoA9jOhK32p9IDCVL1Paut5NujLvITPPJ0fT8NxwYh-elBGZveRUT0QLXf1TL2F3yARZlFoFmewd-kwFr7UM-mb8x8FLGmgQH-WT0U_HzPEvqJrmEy9JmVrPvcPFyjBLOpnfjkzpZkkDL_f4vRO9G_zP9RB2WHuSLamT6bYIViIKcqfAmc0jCa2_l5qCFsT2c7dWTlOMIvDYnzk1HPNP6XRYks4Prr91IPU77rCWLqa6bjqpj-1RMMd15Ngmryr-U694WZBoyS-c6-Nd3nWtzOv028g-UFgV5ksYSPItxQm8wAlk5trGBnZHz-6HZIPRgu0KrVk1K-url-cz_71kusdjdhsiu2msjzu8wCSIz4pwvCvkf7tUa_Mnx9TItcweXNPahNwh5REsJPVPue3AxmwAIUckAokEWUZ2EFQS5MiiABCqK-PMF9Ze7voT1trtaatLvoI6YjiH3dyzYBJUq8B0qvlBeoRZ292DyId4%3D&p=9NwGV8Ov71o%3DGvDnjwMsu_lk8V15hrmPeFtKCBAoDX5kqrLpJGAkdwUFrZElDt7JkNPoukCr4LNBcsHUql0CIKl2I8U01IbyRPIMjn9MbDYxaGA86bW6ZMX1tpuS8JuFkn10U6RN5q-ZsAgn7Pj6x2RlmTm_ETr0BFNc48V7zfUBE2iCaPoHKp7Pe0A5iwitQ9P9me2wBTv04i1Sf62aeHwrt6yQRVwr0thcRkxD4HbLImOo0y7jM05menv_5t6z4E7veJT73rjrVkDDT-D8T5fBAqPD3knPncHf72D-5YPZ8EM6sT5FcUSjANtnm0oMhr81AQZIG_1E1fcqry_a2iNRDat2c3TttuYBhd78usoaioeEsfL0DpbEzP12mq3DJEsxkUwCqxCHzTTsOaxB2XG_DsWLIzUAytc3scrMAqaj9NsW_X9yfJLX8Q9nbnMSupK4aNwT398y1SjhN9fGVZeR6SAHpoXh1EbVghrpsY5v-qkWfY1l4JNgJaVP3q5a1Hhufn5HZEoa9wFvy0G9e6WfL_uKP5jCgLtG_CuizVbs0Uy4DJNuV-z03z9vKqXE8Yo8JVTwyhmdL-pi_wCyv4-BkVHJGeCvAglCK1cAARKXst1BP1qiNCdl1h5sdhY_88jsTbm1Q6R5oUbYsaBXD-lplZYwDUIsAQ84l5q8KifmYKxki7BudLp7xFpVmQMkRIYCcl1uzSLb-408P4GwyF7jaqhySIz2nPSbsKtBRTOo5W3LAqRv91G72iFMlXJNconsA0NoVrtczzBqbw_tEJWA40sk3PlrhyEJh9EANYOdHW7YSQB0zMUZpFD8de_DycdNBT_XsahUdh3QYQk4Q5-7htfPiQ31eGwuz8K--aVuU3PrQfkI3Mw%3D&p=9NwGV8Ov71o%3DGvDnjwMsu_lk8V15hrmPeFtKCBAoDX5kqrLpJGAkdwUFrZElDt7JkNPoukCr4LNBcsHUql0CIKl2I8U01IbyRPIMjn9MbDYxaGA86bW6ZMX1tpuS8JuFkn10U6RN5q-ZsAgn7Pj6x2RlmTm_ETr0BFNc48V7zfUBE2iCaPoHKp7Pe0A5iwitQ9P9me2wBTv04i1Sf62aeHwrt6yQRVwr0thcRkxD4HbLImOo0y7jM05menv_5t6z4E7veJT73rjrVkDDT-D8T5fBAqPD3knPncHf72D-5YPZ8EM6sT5FcUSkXf6srQ-b2tK27c6OXA_DAB4935xYTX9p5kUA_wvlm8kuq1Q7nTWS5krxmDeCQG8Rk5lyLr06Vq8YF-QNLIwd1zCO3OJf47wVIvxsDPaFnYxUgoM7N8Y2u2K0xfk_bKOnwzDnrcsRvYvxnINmoZZTyJKVtxAZdayI_2uWaFMTo0nC7HHToNCxIVJI-S9sKDM4VeiX-SUtuyQldyNoIyGmflzUrN4Ub5-tg9OcqhlHcLFEPX03EOxNoZ69YdiLtt-exTtSDxu3LBIUUVqrQVcRPbmg0VMtqL6bP46krHoHWcvCdA-FVleNjCjBpMdjOyTNNPffgksXZ9WGQPJ2DL1gw0hEncSA6kNOZOTU5iULSoWjdLO6I12T9qBCJG-XoBOYN7bokJGGQK-1TwLa2fpfNGtXmhOMGpA97kx69eBS56snLgfC_0oRASvVXoO430ik3oVpkIgCAuR__jPngGzAz850vZDZVnUj87F-31hHN9znofPqype-ztfSmGtYauMJPJNkcPjgB11927oDrS6_m2FDaa6WtXkaA7OZAQbiYn-5HtOEldBrni6WHYQXfqI%3D&p=9NwGV8Ov71o%3DGvDnjwMsu_lk8V15hrmPeFtKCBAoDX5kqrLpJGAkdwUFrZElDt7JkNPoukCr4LNBcsHUql0CIKl2I8U01IbyRPIMjn9MbDYxaGA86bW6ZMX1tpuS8JuFkn10U6RN5q-ZsAgn7Pj6x2RlmTm_ETr0BFNc48V7zfUBE2iCaPoHKp7Pe0A5iwitQ9P9me2wBTv04i1Sf62aeHwrt6yQRVwr0thcRkxD4HbLImOo0y7jM05menv_5t6z4E7veJT73rjrVkDDT-D8T5fBAqPD3knPncHf72D-5YPZ8EM6sT5FcUSkXf6srQ-b2u6MeEs521B7eegT92QYmXd5pEV9MpBiZT5XLPcokmcF9lgQUju0kcrYS8cv36tUB29WV8w2ZQgbKQX7amP7gb9yOHCvwXWybAOpvScLDykZzMsudxvJHVfjvREOYxoRC3va6z40tAtBpq9JYIWk31KK6qqdnAFsMLdNDIGg-ItA6S1hDFE442ih-D37XAE0WTr2qOAzfk1mHv-DhSmIBjVbpMK5tkovmiZlCQWtWorN35Ucy1G1vcoc3xzgBdDgWKjrzOkdLQtYyQ1MO298uOtXv9vwGWt7pqboJvFhdIzKbBOw1Et742uOxuaoja0irViz9-ZwsAkD1qtkEZbgaWXWxoT_kf8nV0PwL6Et6X6FwWcSQSe9tZDQPqOo8keK_CxHvLUpW-z7DvdniZ85Q62AJalyIcsosLL8NLepgcSSDrENyFXQ9H2nce91Ml57lFBf-kJUlPXdjYhMpeDnbufskoGsBEuYLCNyqE2YKuDiAYW-GzygHXu0N5gAY7t-ycu-0MltxlMafR28H86xoQLBkn-g2eIYy18qg41snxQQrP7vzUxwQag%3D&p=9NwGV8Ov71o%3DGvDnjwMsu_lk8V15hrmPeFtKCBAoDX5kqrLpJGAkdwUFrZElDt7JkNPoukCr4LNBcsHUql0CIKl2I8U01IbyRPIMjn9MbDYxaGA86bW6ZMX1tpuS8JuFkn10U6RN5q-ZsAgn7Pj6x2RlmTm_ETr0BFNc48V7zfUBE2iCaPoHKp7Pe0A5iwitQ9P9me2wBTv04i1Sf62aeHwrt6yQRVwr0thcRkxD4HbLImOo0y7jM05menv_5t6z4E7veJT73rjrVkDDT-D8T5fBAqPD3knPncHf72D-5YPZ8EM6sT5FcUSkXf6srQ-b2gBBSTIkAuznGL1AHHkisoukuxC6lSTYyTsLtsTVKfsNw14x32dhSWzcoBUcLs1sHzz33xOrTIDuhTSvMVpnsFQKZYqkDZNd8d5xVP8IZfovpwqNzAWS4mI7MCtaP_CCAl2ROUc-ZcQkKjMd5mFXsR398zUYmqJBWl9K2z5EGBSzr4FJCGAb3G27s0xlQ7KRgaLTJVFCe8mB5peaEuUl7pXj_R4BsxBL9vXGEuse3fC04VX3tHsco7LwlGd0m14bFgbshxgY-eieWY95TgnOrjnYRKfKQIE80-6k5xfqsXHclEgt1G4cjP4aGlDmajUpbaYmvdcuxcidFGs1x1EL1LT7Hj99EzPQvGHAM_Z3WG9jNjCTIjew7VNh08nWPcA71M3sjINniGweVjeUMZ1gaNXhwJSrBTZ-h6R_ipO_k0sgREne5-gEYKNSKFwzx16fw3y45Ipvuain4odfpCmG5AG_r_yr1zfUraJMWjIogMcWAOd8nXD7VGr76KzeaKTiOCU_4CAxzKiCkHlcuVygA_18jDZjnbeyT0GmU_qnfvu8-OpJsL6Wk3Y%3D&p=9NwGV8Ov71o%3DGvDnjwMsu_lk8V15hrmPeFtKCBAoDX5kqrLpJGAkdwUFrZElDt7JkNPoukCr4LNBcsHUql0CIKl2I8U01IbyRPIMjn9MbDYxaGA86bW6ZMX1tpuS8JuFkn10U6RN5q-ZsAgn7Pj6x2RlmTm_ETr0BFNc48V7zfUBE2iCaPoHKp7Pe0A5iwitQ9P9me2wBTv04i1Sf62aeHwrt6yQRVwr0thcRkxD4HbLImOo0y7jM05menv_5t6z4E7veJT73rjrVkDDT-D8T5fBAqPD3knPncHf72D-5YPZ8EM6sT5FcUSkXf6srQ-b2tCXs1fVAWP6i7hXaTOOacx1zJ-IrXOMoyH6Mgx_VBFag2bgFUr6xCJ4dxOaqfoC8KAHPnCr_J-UiCtRtJc1Owvhs6xpKx6JRrWMZ0DzoyuMnfJt0VszLwZhocDFO--fB7AVa-a6GweOUTmyGprcc5Wo2a50cLC-RGj1tiVOpDZOZ8FZk0-OdBmqHxewgcHP88aRt8Tm0AGTAnGePNYsJmw6vTd6MBRVzv4YqEh0QYH2obSaI6rHpTGnptchUKL1C7ocyYNtk-fci1zPKP8azp-8N6wamyFm_r24ux1SDWKHkbpcyEHPiCfE_5vxGgoaZQVU6oYzG8u01qD2pPYA5_Hii35kiwdAIaVSkwptOHKoFdedOJDptFgAfllVCXmLRPG74N8WJQED2g-p2cfU3mjiLE--envEHUy-et7THwMq4S8jKLjHcBKivAuT-tqjK4-nerapcRlWBseKMcI7V412SBfTRpygqCmyeUdX1tczLe8rWUProl-KPBoStuUH-MlBb16O7xkmnE2y11Xv-fjX0ay9Cs3_MgS2rnJ6lllCduKRaj7WeL0%3D&p=9NwGV8Ov71o%3DGvDnjwMsu_lk8V15hrmPeFtKCBAoDX5kqrLpJGAkdwUFrZElDt7JkNPoukCr4LNBcsHUql0CIKl2I8U01IbyRPIMjn9MbDYxaGA86bW6ZMX1tpuS8JuFkn10U6RN5q-ZsAgn7Pj6x2RlmTm_ETr0BFNc48V7zfUBE2iCaPoHKp7Pe0A5iwitQ9P9me2wBTv04i1Sf62aeHwrt6yQRVwr0thcRkxD4HbLImOo0y7jM05menv_5t6z4E7veJT73rjrVkDDT-D8T5fBAqPD3knPncHf72D-5YPZ8EM6sT5FcUSkXf6srQ-b2qvyo_5jO3XCmG8cRpIedPspvshgl8uAvEtS3wSgd8JKLVV3UNB_2pJqIYz8DuasDdcfliHxu67ooE_ifkCG6HihA24KcJTk9aqz5yuwkdH9NAULwMbLw96OI0ZwsaGd2a1IKHEkTu-UnUplQ0QQuC3fp7Igb9cx0ZZyPKntSq619hlfs4oBU7M92wCrwzv-eNJw1MDbZxzc1BCZLa-wj1V0ftIU7d-_UHO02Z00Q4HJMeCD1WqVtyCCH3ld5ZUSbHzHD-bXKsydv-QxzCaISGRiA_cMbnWQnwGMWbcio-OFWjIkbjjpxnJuj6-HXklGNmLe1bswKUTdvKcXx_LgDYWWmXWSltnFUVDbo0AIh8mpX4E957SfnWOG7U06RtKCeZcTNxzKIgfIOUCP-3xhbiVj5SyG_mkF2H26dFvgvowBhY_J8Z1hnDi5wvhwHC7bh7bOqbQYxQbVG0Kz3n8f5rv27VhEAE3XkWK5oQj1MEXFOAJ3mDUXgCUOFLEmEXI7boUWopXt4U8VtvozjrUzvOJgUtkjC19GRMJYtx-DX-yDn3sX85BhCWE%3D&p=9NwGV8Ov71o%3DGvDnjwMsu_lk8V15hrmPeFtKCBAoDX5kqrLpJGAkdwUFrZElDt7JkNPoukCr4LNBcsHUql0CIKl2I8U01IbyRPIMjn9MbDYxaGA86bW6ZMX1tpuS8JuFkn10U6RN5q-ZsAgn7Pj6x2RlmTm_ETr0BFNc48V7zfUBE2iCaPoHKp7Pe0A5iwitQ9P9me2wBTv04i1Sf62aeHwrt6yQRVwr0thcRkxD4HbLImOo0y7jM05menv_5t6z4E7veJT73rjrVkDDT-D8T5fBAqPD3knPncHf72D-5YPZ8EM6sT5FcUSkXf6srQ-b2q6zytT0NhI8GWWU2aTygornzMw4BlkokwerKiLAb3WOIlCqnl1m8ooIFemP_7viUpe_zCVciGyxzg28vpIsZAL6pfGQ9dj7SLj18d9aP0VFCiydqTx7tWCAbI-gkPT6RsDoFm8UVbP7VOQYXqNyDquserDSxaoABXKZ1YGoAJj1ME-nFBYN8S0o-w4hXfFYuubUQ5vLZBfusEGZDL6VU006TJ6KcpR82BBHEcDSsbmZalpzUcl0s45uyOkT2jSVZNrSZGI9o11CnedEdHXhq7BGIP35hyIZQ8q9O2ufN00vcBs8Cnb8OwXfQ-0mwMnnPVzsUK3bOrgFRnB9kufGULlXqnLkwrpZlr6-u-IGDOPLLP_uOkz-n_0__7Z0_LCWoWrTcqsC93OMsPl4NdpMiw8jldQ3dA_3aH88LrhzTFLxo1b4lzFwqzEe8fC59CP332nZ9SjK6M8MOP3TwOTCHpL-eTfnTRO0jJIatuwrkfLcuvWcTXHWTwKR9x3iGH_jOAhzjow3YqPvEp2VfYhGgMaD4lI7vbqRG3r9wT0hGoE39WkxFXtzQvw%3D&p=9NwGV8Ov71o%3DGvDnjwMsu_lk8V15hrmPeFtKCBAoDX5kqrLpJGAkdwUFrZElDt7JkNPoukCr4LNBcsHUql0CIKl2I8U01IbyRPIMjn9MbDYxaGA86bW6ZMX1tpuS8JuFkn10U6RN5q-ZsAgn7Pj6x2RlmTm_ETr0BFNc48V7zfUBE2iCaPoHKp7Pe0A5iwitQ9P9me2wBTv04i1Sf62aeHwrt6yQRVwr0thcRkxD4HbLImOo0y7jM05menv_5t6z4E7veJT73rjrVkDDT-D8T5fBAqPD3knPncHf72D-5YPZ8EM6sT5FcUSkXf6srQ-b2lgsMRzG837UeAfMSJkZFVa-RqsgsE_ISBce8SfxdapEIFkUFC5VgNrVNX79HXX3QdtNcRXq2gYX1ykoEnAgL3Cen85wwVJSB5tdV7AL32ezz8ECPaW6JVW591m1XHnBg38INYpBi6ynKpvxRUgpc-pKx5m_et0biVmPMplBkzKPezNmjCWDV1MThl0fzYSIFsTFWbP6j2W9Z18MvwFjkLzOXrKTWM2LPgj40px4svGVpLGnapdrhOBaB9EkFYiW_ddAg8cMpxiYIuYCSiydmOLJN87wHbne1XaEZjIKn_CQ7XFKPgx1g_7BgBY8CkwQ1HCD2ENgj4uFfM3d0DQjXqmrVJsxuO93NIuLcZ6eB4-e-CYPLWQn5DnXs-AnUDM28WrgZ1aZ9qExHxe7zAOqm5oJk1UYfbTeYuOmS9fyTQroZFE7sYU_bPcv-uNYrVW89obzfK5gKzrFKwwyTCK5w79Ha5y4Mc2IVkVfRR8M2GFHFGWFOV0h27V5-paMr_41_XuBv8LVsWigAsFNi1_FNOhTjml6MQK7goyu3Bbjyo2fNwPy31cOVhU%3D&p=9NwGV8Ov71o%3DGvDnjwMsu_lk8V15hrmPeFtKCBAoDX5kqrLpJGAkdwUFrZElDt7JkNPoukCr4LNBcsHUql0CIKl2I8U01IbyRPIMjn9MbDYxaGA86bW6ZMX1tpuS8JuFkn10U6RN5q-ZsAgn7Pj6x2RlmTm_ETr0BFNc48V7zfUBE2iCaPoHKp7Pe0A5iwitQ9P9me2wBTv04i1Sf62aeHwrt6yQRVwr0thcRkxD4HbLImOo0y7jM05menv_5t6z4E7veJT73rjrVkDDT-D8T5fBAqPD3knPncHf72D-5YPZ8EM6sT5FcUSkXf6srQ-b2vebsmh7fSK-7q7B6lgHrr8il8-P_B_KhCnVQ46wVwVyOhZdso1xGDzn8oSkq_kpf9nfmCknP6m-3Dasex321U8bcygXchiF3pR_onoVAAWDO587i8qH1odi_NcaOKsE4NFrSrPGbTIc5xlMNF5-jI3ffuegkkuIxTUdGjXoCvJQs_WjCENytKHpJRjuSBA68q9ZY8E3TpRkKFVrsuhHgwF1PPhJtkgcsRsvzKdJ9MhXV76cE_Y8sNTbXsTY8q-5oyNlNzYCb9lLV5AmXATDEuNQKylsy3vY9QeeS24Z32wCod4xczJJl8FHIHY_M2Q_jEVLGRybs1KKHYstT6Ob21cNLkbMmNjoYF2iFqu-r9tb-6P-fJW6jRdLPaTICa6V45cIsEADZKocbOfwl77G9lbO2grmWs-qB7-5jqTVEdG7xL_I3RRTHf2QrJCSw0AIKeFAOj07kI5TL8FYqC6XHc58wPQoxeWtnzL-sY8kDHx8vfQ9a2Uo_YR5SbFSx1sn0dkHgKySCSo1etzwpSX4Akkv8W85v79aLirrdEcOpKxrtJXUfv_Xnbo%3D'||$.getdata("zqgetbody_body");
let smallzq = $.getdata('youth_cut');
let indexLast = $.getdata('zqbody_index');
let artsnum = 0, videosnum = 0;
let videoscore = 0,readscore = 0;
let artArr = [], delbody = 0;
if (isGetbody = typeof $request !==`undefined`) {
   Getbody();
   $done()
} 
let lastIndex = $.getdata('zqbody_index')
if (!$.isNode() && !YouthBody == true) {
    $.log("您未获取阅读请求，请求阅读后获取")
    $.msg($.name, "您未获取阅读请求，请求阅读后获取", "", {
        'open-url': "https://kandian.youth.cn/u/UnEWm"
    })
    return
} else if (!$.isNode() && YouthBody.indexOf("&") == -1) {
    ReadArr.push(YouthBody)
} else {
    if ($.isNode()) {
        if (process.env.YOUTH_READ && process.env.YOUTH_READ.indexOf('&') > -1) {
            YouthBodys = process.env.YOUTH_READ.split('&');
            console.log(`您选择的是用"&"隔开\n`)
        } else if (process.env.YOUTH_READ && process.env.YOUTH_READ.indexOf('\n') > -1) {
            YouthBodys = process.env.YOUTH_READ.split('\n');
            console.log(`您选择的是用换行隔开\n`)
        } else {
            YouthBodys = [process.env.YOUTH_READ]
        }
    } else if (!$.isNode() && YouthBody.indexOf("&") > -1) {
        YouthBodys = YouthBody.split("&")
    };
    Object.keys(YouthBodys).forEach((item) => {
        if (YouthBodys[item]) {
            ReadArr.push(YouthBodys[item])
        }
    })
}
timeZone = new Date().getTimezoneOffset() / 60;
timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
bjTime = new Date(timestamp).toLocaleString('zh', {
    hour12: false,
    timeZoneName: 'long'
});
console.log(`\n === 脚本执行 ${bjTime} ===\n`);
$.log("******** 您共获取" + ReadArr.length + "次阅读请求，任务开始 *******")

!(async() => {
    if (!ReadArr[0]) {
        console.log($.name, '【提示】请把抓包的请求体填入Github 的 Secrets 中，请以&隔开')
        return;
    }
if (!$.isNode()) {
  $.begin = indexLast ? parseInt(indexLast) : 1;
  if ($.begin + 1 < ReadArr.length) {
    $.log("\n上次运行到第" + $.begin + "次终止，本次从" + (parseInt($.begin) + 1) + "次开始");
  } else {
    $.log("由于上次缩减剩余请求数已小于总请求数，本次从头开始");
    indexLast = 0,
    $.begin = 0
  }
} else {
  indexLast = 0,
  $.begin = 0
}
    if (smallzq == "true") {
        $.log("     请注意缩减请求开关已打开‼️\n     如不需要    请强制停止\n     关闭Boxjs缩减请求开关")
    };
    $.index = 0;
    for (var i = indexLast ? indexLast : 0; i < ReadArr.length; i++) {
        if (ReadArr[i]) {
            articlebody = ReadArr[i];
            $.index = $.index + 1;
            $.log(`-------------------------\n开始中青看点第${$.index}次阅读\n`);
            await bodyInfo();
        }
    };
    $.log("\n……………………………………………………………………\n\n本次共删除" + delbody + "个请求，剩余" + (ReadArr.length - delbody) + "个请求");
    $.log("本次共阅读" + artsnum + "次资讯，共获得" + readscore + "青豆\n观看" + videosnum + "次视频，获得" + videoscore + "青豆(不含0青豆次数)\n");
    console.log(`-------------------------\n\n中青看点共完成${$.index}次阅读，共计获得${readscore+videoscore}个青豆，阅读请求全部结束`);
    $.msg($.name, `本次运行共完成${$.index}次阅读，共计获得${readscore+videoscore}个青豆`,"删除"+delbody+"个请求"+(readtimes?"，阅读时长"+parseInt(readtimes)+"分钟":""))
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

function bodyInfo() {
    return new Promise((resolve, reject) => {
        $.get(batHost('article/info/get.json?' + articlebody), async(error, resp, data) => {
            let bodyobj = JSON.parse(data);
            //$.log(JSON.stringify(bodyobj,null,2))
                $.begin = $.begin + 1;
                let res = $.begin % ReadArr.length;
                $.setdata(res + "", 'zqbody_index');
            try {
                if (bodyobj.error_code == "200007"&&!$.isNode()) {
                await removebody();
                delbody += 1;
                $.log(bodyobj.message+"已自动删除");
                } else if (bodyobj.error_code == 0) {
                    acticid = bodyobj.url.match(/\d+/)[0];
                    artdesc = bodyobj.description
                    author = bodyobj.account.name
                    ctype = bodyobj.ctype == 0 ? "阅读资讯" : "观看视频";
                    if (artArr.indexOf(acticid) == -1) {
                artArr.unshift(acticid);
                        $.log(ctype + ": " + artdesc + "  ----- " + author + "\n")
                        await $.wait(10000);
                        await AutoRead();
                    } else if (artArr.indexOf(acticid) > -1&&!$.isNode()) {
                        await removebody();
                        $.log("文章ID:" + acticid + " 请求重复，已自动删除")
                        delbody += 1;
                        await $.wait(1000)
                    }
                }
            } catch (e) {
                $.log('获取文章请求失败' + e)
            } finally {
                resolve()
            }
        })
    })
}


function AutoRead() {
    return new Promise((resolve, reject) => {
        $.post(batHost('article/complete.json', articlebody), async(error, response, data) => {
            let readres = JSON.parse(data);
            //$.log(JSON.stringify(readres,null,2))
            if (readres.items.complete == 1) {
                $.log(readres.items.max_notice)
            } else {
                if (readres.error_code == '0' && data.indexOf("read_score") > -1 && readres.items.read_score > 0) {
                    console.log(`本次阅读获得${readres.items.read_score}个青豆，请等待30s后执行下一次阅读\n`);
                    if (data.indexOf("ctype") > -1) {
                        if (readres.items.ctype == 0) {
                            artsnum += 1
                            readscore += parseInt(readres.items.read_score);
                        } else if (readres.items.ctype == 3) {
                            videosnum += 1
                            videoscore += parseInt(readres.items.read_score);
                        }
                    }
                    if ($.index % 2 == 0) {
                        if ($.isNode() && process.env.YOUTH_ATIME) {
                            timebodyVal = process.env.YOUTH_ATIME;
                        } else {
                            timebodyVal = $.getdata('autotime_zq');
                        }
                        await readTime()
                    };
                    if ($.index == ReadArr.length) {
                        $.log($.index + "次任务已全部完成，即将结束")
                    } else {
                        await $.wait(20000);
                    }
                } else if (readres.error_code == '0' && data.indexOf('"score":0') > -1 && readres.items.score == 0) {
                    $.log(`\n本次阅读获得0个青豆，等待10s即将开始下次阅读\n`);
                    if (smallzq == "true") {
                        await removebody();
                        $.log("已删除第" + ($.begin) + "个请求，如无需删除请及时提前关掉boxjs内的开关，使用后即关闭")
                        delbody += 1
                    }
                } else if (readres.success == false) {
                    console.log(`第${$.index}次阅读请求有误，请删除此请求`);
                    if (smallzq == "true") {
                        await removebody();
                        $.log("已删除第" + ($.begin) + "个请求，如无需删除请及时提前关掉boxjs内的开关，使用后即关闭");
                        delbody += 1
                    }
                }
            }
            resolve()
        })
    })
}

function removebody() {
  if (articlebody !== ReadArr[0]) {
      smallbody = $.getdata('youth_autoread').replace("&" + articlebody, "");
  } else {
      smallbody = $.getdata('youth_autoread').replace(articlebody + "&", "")
  }
  $.setdata(smallbody, 'youth_autoread')
}

function batHost(api, body) {
    return {
        url: 'https://ios.baertt.com/v5/' + api,
        headers: {
            'User-Agent': 'KDApp/2.0.2 (iPhone; iOS 14.5; Scale/3.00)',
            'Host': 'ios.baertt.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    }
}

function readTime() {
    return new Promise((resolve, reject) => {
        $.post(batHost('user/stay.json', timebodyVal), (error, resp, data) => {
            let timeres = JSON.parse(data)
            if (timeres.error_code == 0) {
                readtimes = timeres.time / 60
                $.log(`阅读时长共计` + Math.floor(readtimes) + `分钟`)
            }
            resolve()
        })
    })
}

function Getbody() {
    if ($request && $request.method != `OPTIONS` && $request.url.match(/\/article\/info\/get/)) {
        bodyVal = $request.url.split("?")[1];
        if (YouthBody) {
            if (YouthBody.indexOf(bodyVal) > -1) {
                $.log("此阅读请求已存在，本次跳过")
            } else if (YouthBody.indexOf(bodyVal) == -1) {
                YouthBodys = YouthBody + "&" + bodyVal;
                $.setdata(YouthBodys, 'youth_autoread');
                $.log(`${$.name}获取阅读: 成功, YouthBodys: ${bodyVal}`);
                bodys = YouthBodys.split("&")
                $.msg($.name, "获取第" + bodys.length + "个阅读请求: 成功🎉", ``)
            }
        } else {
            $.setdata(bodyVal, 'youth_autoread');
            $.log(`${$.name}获取阅读: 成功, YouthBodys: ${bodyVal}`);
            $.msg($.name, `获取第一个阅读请求: 成功🎉`, ``)
        }
    } else if ($request && $request.method != `OPTIONS` && $request.url.match(/\/v5\/user\/stay/)) {
        const timebodyVal = $request.body;
        if (timebodyVal) $.setdata(timebodyVal, 'autotime_zq');
        $.log(`${$.name}获取阅读时长: 成功, timebodyVal: ${timebodyVal}`);
        $.msg($.name, `获取阅读时长: 成功🎉`, ``)
    }
}


function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
